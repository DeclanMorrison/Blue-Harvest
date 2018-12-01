import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GroceryImage from './img/Grocery.jpg';
import ShoppingIcon from '@material-ui/icons/ShoppingCartOutlined';
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

  console.log(props.calendarRecipes)
  
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
          
          // debugger;
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

        {/* <CheckBoxList>Bread</CheckBoxList>
        <CheckBoxList>Milk</CheckBoxList>
        <CheckBoxList>Beef</CheckBoxList>
        <CheckBoxList>Water</CheckBoxList>
        <CheckBoxList>Carrots</CheckBoxList> */}

      </CardContent>

    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);