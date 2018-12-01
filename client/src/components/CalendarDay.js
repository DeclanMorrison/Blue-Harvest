import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, 
         Card,
         CardContent,
         Typography, 
         CardMedia, 
         GridListTileBar } from '@material-ui/core';

const styles = {
  card: {
    height: '80%',
  },
  titleBar: {
    marginTop: '30px',
    borderRadius: '4px',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white'
  }
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      {Object.keys(props.recipe).length === 0 ? <div></div> :
      <React.Fragment>
        <img src={props.recipe.image}/>
        <GridListTileBar
          className={classes.titleBar}
          title={props.recipe.label}
          titlePosition="top"
          actionIcon={
            <IconButton className={classes.icon} onClick={() => props.handleAddRecipeToCalendar({}, props.title)}>
              <DeleteIcon />
            </IconButton>
          }
          actionPosition="right"
          />
      </React.Fragment>}
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);