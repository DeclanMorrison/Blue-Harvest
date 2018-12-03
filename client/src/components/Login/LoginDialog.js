import React from "react";
import { Redirect } from "react-router-dom";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Done, Close } from "@material-ui/icons";
import API from "../../utils/API";
import red from '@material-ui/core/colors/red';

class LoginDialog extends React.Component {

  state = {
    email: "",
    password: "",
    redirect: false,
    failed: false
  };

  handleOnChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleSignInAttempt = () => {
    let email = this.state.email;
    let password = this.state.password;
    if (email && password) {
      API.login(email, password).then(res => {
        if (res.data.message !== "user authenticated") {
          console.log(`user not authenticated`);
          this.setState({ failed: true, email: "", password: "" });

        } else {
          console.log(`success! result: ${res.data.message}`);
          this.props.handleCloseLogin();
          this.setState({ redirect: true });
        }
      });
    } else {
      // set it up to alert user that form input/s are empty and to retry login
      console.log("Something went wrong with login")
    }
  };

  handleLogout = () => {
    console.log("logging out")
    API.logout().then(res => {
      console.log(res);
    });
    this.props.handleCloseLogin();
  };

  handleClose = () => {
    this.setState({ failed: false });
    this.props.handleCloseLogin();
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/home" />;
    } else {
      return (
        <Dialog
          open={this.props.open}
          onClose={this.props.handleCloseLogin}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.failed ?
                <div className="statusMessage" style={{ color: red[500] }}>
                  Incorrect email or password.
              </div> :
                <div className="statusMessage">
                  To Log in please fill in the fields below.
              </div>}
            </DialogContentText>
            <TextField
              value={this.state.email}
              onChange={this.handleOnChange}
              name="email"
              placeholder="Email"
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="string"
              fullWidth
            />
            <TextField
              value={this.state.password}
              onChange={this.handleOnChange}
              name="pass"
              placeholder="Password"
              margin="dense"
              id="password"
              label="Password"
              type="Password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              <Close />
              Cancel
            </Button>

            <Button onClick={this.handleSignInAttempt} color="primary">
              <Done />
              Log In
            </Button>
          </DialogActions>
        </Dialog>
      );
    };
  };
};
export default LoginDialog;
