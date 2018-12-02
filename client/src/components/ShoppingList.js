import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import ShoppingIcon from '@material-ui/icons/ShoppingCartOutlined';
import GroceryImage from './img/Grocery.jpg';
import CheckBoxList from './CheckBoxList';

const styles = {

  card: {
    maxWidth: 345,
    textAlign: 'center',
    marginTop: '75px',
    margin: 'auto auto',

  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={GroceryImage}
        title="Grocery"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <ShoppingIcon /> Your Grocery List:
        </Typography>
        {Object.keys(props.calendarRecipes).map(value => {
          // if (Object.keys(props.calendarRecipes[value]).length === 0){
          //   (<div></div>)
          // } else {
          <Typography component="h6" variant="g6">
            {console.log(props.calendarRecipes[value].label)}
            {console.log(props.calendarRecipes[value].ingredientLines)}
            {props.calendarRecipes[value].label}
            {/* {props.calendarRecipes[value].ingredientLines.map(ingreds => {
              <CheckBoxList>{ingreds}</CheckBoxList>
            })} */}
          </Typography>
          // }
        })}
      </CardContent>
    </Card>
  );
};

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);