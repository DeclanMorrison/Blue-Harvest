
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Zoom, Tooltip, GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import OpenIcon from "@material-ui/icons/ExitToAppRounded";
import Menu from "../components/Menu";
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
  },
});

class TitlebarGridList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    cols: ""
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
  
  handleRemoveFavorite = (id) => {
    console.log(`removing recipe by id : ${id}`)
    API.removeFavoriteById(id).then(res => {
      this.props.updateFavorites()
      console.log(res)
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={130} cols={this.state.cols} className={classes.gridList}>
          {(this.props.favorites).map((fav, index) => (
            <GridListTile key={index}>
              <img src={fav.image} alt={fav.label} />
              <GridListTileBar
                title={fav.label}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <Tooltip TransitionComponent={Zoom} title="Remove from favorites">
                      <DeleteIcon onClick={() => { this.handleRemoveFavorite(fav.id) }} />
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="View on Site">
                      <OpenIcon onClick={() => this.handleOpenInSite(fav.url)} />
                    </Tooltip>
                    <Menu recipe={fav} handleAddRecipeToCalendar={this.props.handleAddRecipeToCalendar} />
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
