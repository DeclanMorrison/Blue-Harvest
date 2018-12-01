import React from "react";
import Appbar from "../components/Appbar";
import { withStyles } from '@material-ui/core/styles';
import Recipes from "../components/Recipes";
import Calendar from "../components/Calendar";
import { Typography, Divider } from "@material-ui/core";
import 'typeface-fjalla-one';
import SearchBar from '../components/SearchBar';
import {Grid} from '@material-ui/core'
import { isThisMonth } from "date-fns";

const styles = {
    sectionHeader: {
      fontFamily: "Fjalla One",
    },
    grid: {
      overflowX: 'auto'
    },
    // searchBar: {
    //   marginBottom: '100px'
    // }
  };
  
  class Home extends React.Component {
    
    state ={ 
      calendarRecipes: {
        "Monday" : {},
        "Tuesday" : {},
        "Wednesday" : {},
        "Thursday" : {},
        "Friday" : {},
        "Saturday" : {},
        "Sunday" : {},
      },
      recipes : [],
      searchTerm: "",
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

    handleAddRecipeToCalendar = (recipe, day) => {
      let newDay = this.state.calendarRecipes[day];
      const newCalendarRecipes = this.state.calendarRecipes;

      newDay = recipe;
      newCalendarRecipes[day] = newDay;

      this.setState({calendarRecipes: newCalendarRecipes});
    };

    handleUpdateSearchTerm = (term) => {
      this.setState({searchTerm: term});
    };

    handleUpdateRecipes = (recipes) => {
      // this.setState({recipes : {}});
      this.setState({recipes : recipes.hits});
    };

    handleUpdateCalendarRecipes = (recipe, day) => {
      const calendarRecipesState = this.state.calendarRecipes;
      calendarRecipesState[day] = recipe;
      this.setState({calendarRecipes: calendarRecipesState})
    }

    // componentDidMount = () => {
    //   axios.get("https://api.edamam.com/search", {
    //     params: {
    //       q: "lobster",
    //       app_id: "f457772e",
    //       app_key: "47c5a1d77ba0337a17e3f917071f5c6e"
    //     }
    //   }).then(response => {
    //     this.setState({recipes : response});
    //   });
    // };

    render() {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <Appbar calendarRecipes={this.state.calendarRecipes}>
            <Typography className={classes.sectionHeader} font="typeface-fjalla-one" variant="h3"> This Week</Typography>
            
            <Divider/>
            <br/>
            <Calendar handleAddRecipeToCalendar={this.handleAddRecipeToCalendar} calendarRecipes={this.state.calendarRecipes} handleAddToIngredients={this.handleAddToIngredients}/>

            <br/>
            
            <br/>
            
            <Grid container spacing={8} justify="space-between" alignItems="flex-end">
              <Grid item>
                <Typography className={classes.sectionHeader} font="typeface-fjalla-one" variant="h3">{this.state.searchTerm ? ` Recipes for ${this.state.searchTerm}` : ` Recommended Recipes`}</Typography>
              </Grid>
              
              <Grid item>
                <SearchBar handleUpdateSearchTerm={this.handleUpdateSearchTerm} handleUpdateRecipes={this.handleUpdateRecipes} className={classes.searchBar}></SearchBar>
              </Grid>
            </Grid>
            
            
            <Divider/>
            <br/>
            <Recipes recipes={this.state.recipes} handleAddRecipeToCalendar={this.handleAddRecipeToCalendar}/>
          </Appbar>
        </React.Fragment>
      );
    };

  };
  
  export default withStyles(styles)(Home);