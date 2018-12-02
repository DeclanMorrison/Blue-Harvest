import React from 'react';
import { Tooltip, Zoom, Menu, MenuItem } from '@material-ui/core';
import DropIcon from '@material-ui/icons/DateRangeRounded';

class SimpleMenu extends React.Component {
  constructor(props) {
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
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(value => {
            <MenuItem onClick={() => this.handleClose(value)}>{value}</MenuItem>
          })}
        </Menu>
      </React.Fragment>
    );
  }
}

export default SimpleMenu;