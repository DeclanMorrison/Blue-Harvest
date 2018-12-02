import React from "react";
import { withStyles } from '@material-ui/core/styles';
import 'typeface-fjalla-one';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";


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
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    );
  }
};

export default withStyles(styles)(App);
