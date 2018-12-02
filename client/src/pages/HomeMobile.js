import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Divider, Grid } from "@material-ui/core";
import "typeface-fjalla-one";
import { Appbar, Recipes, Favorites, Calendar, SearchBar } from '../components';
import API from "../utils/API";

const styles = {
  sectionHeader: {
    fontFamily: "Fjalla One"
  },
  grid: {
    overflowX: "auto"
  },
};

class Home extends React.Component {

  state = {
    calendarRecipes: {
      "Monday": {},
      "Tuesday": {},
      "Wednesday": {},
      "Thursday": {},
      "Friday": {},
      "Saturday": {},
      "Sunday": {},
    },
    recipes: [],
    favorites: [],
    searchTerm: "Chicken",
    view: "Recommended"
  };

  handleView = newview => {
    console.log(`view is changing to ${newview}`);
    if (newview === "Favorites") {
      this.getFavorites();
      this.setState({ view: newview });
    } else {
      this.setState({ view: newview });
    }
  };

  handleAddRecipeToCalendar = (recipe, day) => {
    let newDay = this.state.calendarRecipes[day];
    const newCalendarRecipes = this.state.calendarRecipes;
    newDay = recipe;
    newCalendarRecipes[day] = newDay;
    this.setState({ calendarRecipes: newCalendarRecipes });
  };

  handleUpdateSearchTerm = (term) => {
    this.setState({ searchTerm: term });
  };

  handleUpdateRecipes = (recipes) => {
    this.setState({ recipes: recipes.hits });
  };

  componentWillMount() {
    const saveCal = localStorage.getItem('day')
    if (saveCal === null) {
      return;
    } else {
      this.setState({
        calendarRecipes: JSON.parse(saveCal),
      });
    };
  };

  componentWillUpdate() {
    localStorage.setItem("day", JSON.stringify(this.state.calendarRecipes));
  };

  handleUpdateCalendarRecipes = (recipe, day) => {
    const calendarRecipesState = this.state.calendarRecipes;
    calendarRecipesState[day] = recipe;
    this.setState({ calendarRecipes: calendarRecipesState })
  };

  getFavorites = recipes => {
    console.log(`getting favorites`);
    API.getFavorites().then(res => {
      let recipeList = res.data.hits;
      console.log(res);
      this.setState({ favorites: recipeList });
      console.log(`Favorites are - ${this.state.favorites}`);
    });
  };

  render() {
    const { classes } = this.props;
    let view = this.state.view;
    let viewComponent;
    if (view == "Favorites") {
      viewComponent = (
        <Favorites
          view={this.state.view}
          updateFavorites={this.getFavorites}
          favorites={this.state.favorites}
          handleAddRecipeToCalendar={this.handleAddRecipeToCalendar}
        />
      );
    } else {
      viewComponent = (
        <Recipes
          view={this.state.view}
          recipes={this.state.recipes}
          handleAddRecipeToCalendar={this.handleAddRecipeToCalendar}
        />
      );
    }
    let recipesArr =
      this.state.view === "Favorites"
        ? this.state.favorites
        : this.state.recipes;
    return (
      <React.Fragment>
        <Appbar
          handleView={this.handleView}
          getFavorites={this.getFavorites}
          calendarRecipes={this.state.calendarRecipes}
        >
          <Typography
            className={classes.sectionHeader}
            font="typeface-fjalla-one"
            variant="h3"
          >
            {" "}
            This Week
          </Typography>
          <Divider />

          <br />

          <Calendar handleAddRecipeToCalendar={this.handleAddRecipeToCalendar}
            calendarRecipes={this.state.calendarRecipes}
            handleAddToIngredients={this.handleAddToIngredients} />

          <br />
          <br />

          <Grid
            container
            spacing={8}
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography
                className={classes.sectionHeader}
                font="typeface-fjalla-one"
                variant="h3"
              >
                {this.state.view === "Recommended"
                  ? ` Recipes for ${this.state.searchTerm}`
                  : ` ${this.state.view} Recipes`}
              </Typography>
            </Grid>
            <Grid item>
              <SearchBar
                handleView={this.handleView}
                handleUpdateSearchTerm={this.handleUpdateSearchTerm}
                handleUpdateRecipes={this.handleUpdateRecipes}
                className={classes.searchBar}
              />
            </Grid>
          </Grid>
          <Divider />

          <br />

          {viewComponent}

        </Appbar>
      </React.Fragment>
    );
  };
};

export default withStyles(styles)(Home);
