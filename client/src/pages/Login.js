import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../components/img/Logo.png';
import SignupDialog from '../components/Login/SignupDialog';
import LoginDialog from '../components/Login/LoginDialog';
import HowToReg from '@material-ui/icons/HowToReg';
import Create from '@material-ui/icons/Create';

const styles = theme => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    background: "url('https://s1.1zoom.ru/b5348/64/Tomatoes_Garlic_Spices_Pasta_Plate_Fork_519009_3840x2160.jpg') no-repeat",
    backgroundSize: 'cover',
  },
  card: {
    height: '200',
    width: '100%',
    textAlign: 'center',
    opacity: '.9'
  },

  logo: {
    width: '200px'
  },
  button: {
    margin: theme.spacing.unit,
    position: 'center'
  },

});

class MediaCard extends Component {
  state = {
    openSignup: false,
    openLogin: false,
  };

  handleClickOpenSignup = () => {
    this.setState({ openSignup: true });
  };

  handleCloseSignup = () => {
    this.setState({ openSignup: false });
  };

  handleClickOpenLogin = () => {
    this.setState({ openLogin: true });
  };

  handleCloseLogin = () => {
    this.setState({ openLogin: false });
  };

 

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <img className={classes.logo} src={Logo} alt="logo"/>
              <Typography component="p">
                To start please Log In. If you do not have an account please Sign Up
            </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button onClick={this.handleClickOpenLogin} size="large" color="primary" className={classes.button}>
              <HowToReg />
              Log In
          </Button>
            <Button onClick={this.handleClickOpenSignup} size="large" color="secondary" className={classes.button}>
              <Create />
              Sign Up
          </Button>
        
          </CardActions>
        </Card>
        
        <SignupDialog 
        open={this.state.openSignup}
        handleCloseSignup={this.handleCloseSignup}
        handleOpenLogin={this.handleClickOpenLogin}
        />
        <LoginDialog 
        open={this.state.openLogin}
        handleCloseLogin={this.handleCloseLogin}
        />

      
      </div>

    );
  }

}




export default withStyles(styles)(MediaCard);


