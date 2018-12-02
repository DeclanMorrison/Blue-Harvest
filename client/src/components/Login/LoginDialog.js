import React from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import API from "../../utils/API";

class LoginDialog extends React.Component {

  state = {
    email: "",
    password: "",
    redirect: false
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
        console.log(`attempting login with email:${email} and ${password}`);
        if (res.data.message !== "user authenticated") {
          console.log(`user not authenticated`);
         
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

  checkAuth = () => {
    let user= {
      email:this.state.email,
      password:this.state.password
    }
    API.checkAuth(user).then((res) => {
      console.log(res)
    })
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
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
              <div className="statusMessage" />
              To Log in please fill in the fields below.
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
            <Button onClick={this.props.handleCloseLogin} color="secondary">
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
    }
  }
}
export default LoginDialog;
