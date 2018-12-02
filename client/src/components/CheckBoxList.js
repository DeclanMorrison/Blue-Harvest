import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const styles = {
  root: {
    color: orange[600],
    '&$checked': {
      color: orange[500],
    },
  },
  checked: {},
  checkBox: {
    display: 'flex',
    alignItems: 'center',

  }


};

class CheckboxLabels extends React.Component {


  state = {
    checked: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row className={classes.checkBox}>

        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              value="checked"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            >
            </Checkbox>
          }
        />

        {this.state.checked ? <strike>{this.props.children}</strike> : <span>{this.props.children}</span>}


      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);