import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExitToApp from '@material-ui/icons/ExitToApp';
import GroceryPopup from './GroceryPopup';

const styles = {
  root: {
    width: (window.innerWidth - 5),
    position: 'fixed',
    bottom: 0
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
    width: ""
  };

  handleWindowResize = () => {
    this.setState({ width: window.innerWidth - 5});
  };

  componentWillMount = () => {
    this.handleWindowResize();
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.handleWindowResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleWindowResize);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        style={{width: this.state.width}}
      >
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon onClick={() => this.props.handleView("Favorites")}/>} />
        <BottomNavigationAction label="Grocery List" icon={<GroceryPopup calendarRecipes={this.props.calendarRecipes}/>} />
        <BottomNavigationAction label="Logout" icon={<ExitToApp />} onClick={this.props.handleLogout}/>
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);