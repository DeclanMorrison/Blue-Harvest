import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ShoppingList from './ShoppingList';
import ShoppingIcon from '@material-ui/icons/ShoppingCartOutlined'

const styles = theme => ({
  paper: {
    overflow: 'scroll',
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  modal: {
    backgroundColor: 'white'
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ShoppingIcon onClick={this.handleOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll="paper"
        >
          <DialogTitle>Shopping List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <ShoppingList calendarRecipes={this.props.calendarRecipes} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
};

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleModal);