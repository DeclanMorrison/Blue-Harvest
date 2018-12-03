import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = {
  card: {
    height: '12vw',
    width: '12vw',
  },
  title: {
    fontSize: 14,
  },
};

function SimpleCard(props) {
  const { classes } = props;
  console.log(props.size);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);