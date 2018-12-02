import React from "react";
import Routes from "./Routes";
import { withStyles } from '@material-ui/core/styles';
import 'typeface-fjalla-one';


const styles = {
  sectionHeader: {
    fontFamily: "Fjalla One",
  },
  grid: {
    overflowX: 'auto'
  }
};

class App extends React.Component {

  state = {
    isLoggedIn : false
  };

  updateLoginState = () => {
    this.setState({isLoggedIn : !this.state.isLoggedIn});
  };

  render () {
    // const { classes } = this.props;
    return (
        <Routes/>
    );
  }
};

export default withStyles(styles)(App);
