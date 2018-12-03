
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { GridList, 
         GridListTile, 
         GridListTileBar, 
         Zoom,
         Tooltip,
         IconButton } from '@material-ui/core';

import OpenIcon from "@material-ui/icons/ExitToAppRounded";

import Menu from "../components/Menu";
import defaultRecipes from './recipesobj';
import FavoritesSB from './FavoritesSB'
import API from "../utils/API";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

class TitlebarGridList extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    cols: "",
  };

  handleWindowResize = () => {
    this.setState({ cols: Math.floor(window.innerWidth / 282) });
  };

  componentWillMount = () => {
    this.handleWindowResize();
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.handleWindowResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleWindowResize);
  };

  handleOpenInSite = url => {
    window.open(url);
  };
  handleAddToFavorites = (name, image, url, ingredients) => {
    console.log(name);
    let recipe = {};
    recipe.name = name;
    recipe.image = image;
    recipe.url = url;
    recipe.ingredients = ingredients;
    console.log(recipe);
    API.saveRecipe(recipe).then(res => {
      if (res.data.message === "user not signed in") {
        window.location.replace("/login");
        return console.log('user needs to sign in')
      } else {
        return console.log("saved");
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={130} cols={this.state.cols} className={classes.gridList}>
          {(this.props.recipes.length === 0 ? defaultRecipes.hits : this.props.recipes).map((hit, index) => (
            <GridListTile key={index}>
              <img src={hit.recipe.image} alt={hit.recipe.label} />
              <GridListTileBar
                title={hit.recipe.label}
                actionIcon={
                  <IconButton className={classes.icon}>
                  <FavoritesSB handleAddToFavorites = {this.handleAddToFavorites} hit={hit}/>
                  <Tooltip TransitionComponent={Zoom} title="View on Site">
                    <OpenIcon onClick={() => this.handleOpenInSite(hit.recipe.url)}/>
                  </Tooltip>
                    <Menu recipe={hit.recipe} handleAddRecipeToCalendar={this.props.handleAddRecipeToCalendar}/> 
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };
};

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TitlebarGridList);
