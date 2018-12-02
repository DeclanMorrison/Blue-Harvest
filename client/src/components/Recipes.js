
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import recipes from "./recipesobj";
import StarIcon from "@material-ui/icons/StarRateRounded";
import OpenIcon from "@material-ui/icons/ExitToAppRounded";
import { Zoom, Tooltip } from "@material-ui/core";
import Menu from "../components/Menu";
import defaultRecipes from './recipesobj';
import FavoritesSB from './FavoritesSB'
import API from "../utils/API";

const styles = theme => ({
  root: {
    // width: `${window.innerWidth - 300}px`,
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
  }

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
                // subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>

                  <FavoritesSB handleAddToFavorites = {this.handleAddToFavorites} hit={hit}/>

                  {/* <Tooltip TransitionComponent={Zoom} title="Add to Favorites">
                    <StarIcon onClick={() => this.handleAddToFavorites(hit.recipe.label,hit.recipe.image,hit.recipe.url,hit.recipe.ingredients)}/>

                    {/* Add functionality to add to favorites */}
                  {/* </Tooltip> */}
                  <Tooltip TransitionComponent={Zoom} title="View on Site">
                    <OpenIcon onClick={() => this.handleOpenInSite(hit.recipe.url)}/>
                  </Tooltip>
                    <Menu recipe={hit.recipe} handleAddRecipeToCalendar={this.props.handleAddRecipeToCalendar}/> 
                    {/* Add functionality to add to calendar */}
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TitlebarGridList);
