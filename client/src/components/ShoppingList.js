import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Grocery from './img/Grocery.jpg'
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: 'white'
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  gridItem: {
    width: "500px"
  }
});

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    const { classes } = this.props;
    let recipes = JSON.parse(localStorage.getItem("day"));

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={16}
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ,'Saturday', 'Sunday'].map(day => {
            if (Object.keys(recipes[day]).length !== 0) {
              return (
              <Grid item className={classes.gridItem}>
                <Typography variant="h4" component="h3" >
                  {day}
                  <Typography variant="h6">{recipes[day].label}</Typography>
                </Typography>
                <List>
                  {recipes[day].ingredientLines.map(value => (
                    <ListItem>
                      <ListItemText primary={value}/>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              );
            } else {
              return;
            };
          })}
        </Grid>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShoppingList);
