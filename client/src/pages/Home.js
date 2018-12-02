import React from "react";
import { Redirect } from "react-router-dom";
import Appbar from "../components/Appbar";
import { withStyles } from "@material-ui/core/styles";
import Recipes from "../components/Recipes";
import Favorites from "../components/Favorites";
import Calendar from "../components/Calendar";
import { Typography, Divider } from "@material-ui/core";
import "typeface-fjalla-one";
import SearchBar from "../components/SearchBar";
import { Grid } from "@material-ui/core";
import API from "../utils/API";

const styles = {
  sectionHeader: {
    fontFamily: "Fjalla One"
  },
  grid: {
    overflowX: "auto"
  }

  // searchBar: {
  //   marginBottom: '100px'
  // }
};
class Home extends React.Component {
  state = {
    calendarRecipes: {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
      Sunday: {}
    },
    recipes: [],
    favorites: [],
    searchTerm: "",
    view: "Recommended",
    redirect: false
    // ingredients: []
  };

  // handleAddToIngredients = (r, i) => {
  //   const stateIngredients = this.state.ingredients;
  //   const recipeObj ={name: r, ingredients: []}
  //   i.forEach((value, index) => {
  //     recipeObj.ingredients.push(value.text);
  //   });
  //   stateIngredients.push(recipeObj);
  //   this.setState({ingredients: stateIngredients});
  // };

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

  handleUpdateSearchTerm = term => {
    this.setState({ searchTerm: term });
  };

  handleUpdateRecipes = recipes => {
    // this.setState({recipes : {}});
    this.setState({ recipes: recipes.hits });
  };
  // Getting Items From LocalStorage On reload
  componentWillMount() {
    const saveCal = localStorage.getItem("day");
    if (saveCal === null) {
      return;
    } else {
      this.setState({
        calendarRecipes: JSON.parse(saveCal)
      });
    }
    // console.log(saveCal, typeof saveCal);
  }

  // Setting Items For LocalStorage
  componentWillUpdate() {
    localStorage.setItem("day", JSON.stringify(this.state.calendarRecipes));
  }

  handleUpdateCalendarRecipes = (recipe, day) => {
    const calendarRecipesState = this.state.calendarRecipes;
    calendarRecipesState[day] = recipe;
    this.setState({ calendarRecipes: calendarRecipesState });
  };

  getFavorites = () => {
    console.log(`getting favorites`);
    API.getFavorites().then(res => {
      // console.log(res)
      if (res.data.message === "user not signed in") {
        this.setState({ redirect: true });
      } else {
        let recipeList = res.data.hits;
        // console.log(res);
        this.setState({ favorites: recipeList });
        // console.log(`Favorites are - ${this.state.favorites}`);
      }
    });
  };

  handleLogout = () => {
    console.log(`\nlogging out user...`);
    API.logout().then(result => {
      console.log(result);
      this.setState({ redirect: true });
    });
  };

  render() {
    const { redirect } = this.state;
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

    // Redirect after logout by user to login page
    if (redirect) {
      return <Redirect to="/login" />;
    } else {
      return (
        <React.Fragment>
          <Appbar
            handleView={this.handleView}
            handleLogout={this.handleLogout}
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
            <Calendar
              handleAddRecipeToCalendar={this.handleAddRecipeToCalendar}
              calendarRecipes={this.state.calendarRecipes}
              handleAddToIngredients={this.handleAddToIngredients}
            />

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
                    ? ` Recommended Recipes`
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
    }
  }
}

export default withStyles(styles)(Home);
