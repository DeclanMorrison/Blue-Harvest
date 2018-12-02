import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
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
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              {`Monday ${recipes.Monday.label}`}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Ingredients ${recipes.Monday.ingredientLines}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              {`Monday ${recipes.Tuesday.label}`}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Ingredients ${recipes.Tuesday.ingredientLines}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              {`Monday ${recipes.Wednesday.label}`}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Ingredients ${recipes.Wednesday.ingredientLines}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              {`Monday ${recipes.Thursday.label}`}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Ingredients ${recipes.Thursday.ingredientLines}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              {`Monday ${recipes.Friday.label}`}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Ingredients ${recipes.Friday.ingredientLines}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              {`Monday ${recipes.Saturday.label}`}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Ingredients ${recipes.Saturday.ingredientLines}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              {`Monday ${recipes.Sunday.label}`}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Ingredients ${recipes.Sunday.ingredientLines}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              {`Monday ${recipes.Monday.label}`}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Ingredients ${recipes.Monday.ingredientLines}`}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShoppingList);
