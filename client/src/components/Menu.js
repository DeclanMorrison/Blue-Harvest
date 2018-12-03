import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DropIcon from '@material-ui/icons/DateRangeRounded';
import {Tooltip, Zoom } from '@material-ui/core';

class SimpleMenu extends React.Component {
  constructor(props){
    super(props);
  };

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (day) => {
    this.setState({ anchorEl: null });
    this.props.handleAddRecipeToCalendar(this.props.recipe, day)
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <Tooltip TransitionComponent={Zoom} title="Add to Calendar">
          <DropIcon onClick={this.handleClick}></DropIcon>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
          <MenuItem onClick={() => this.handleClose(day)}>{day}</MenuItem>
        ))}
        </Menu>
      </React.Fragment>
    );
  };
};

export default SimpleMenu;