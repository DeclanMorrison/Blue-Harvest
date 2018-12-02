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
    data: null,
    isLoggedIn : false
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express}))
      .catch(err => console.log(err));
  };

  callBackendAPI = async () => {
    const response = await fetch('/login');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
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
