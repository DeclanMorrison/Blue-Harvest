import React from "react";
import { Redirect } from "react-router-dom";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Done, Close } from "@material-ui/icons";
import API from "../../utils/API";

class SignupDialog extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
    redirect: false,
    user: ""

  };

  handleOnChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleSignUpAttempt = () => {
    let passwordMatch = true;
    let user = {};
    user.firstName = this.state.firstName;
    user.lastName = this.state.lastName;
    user.email = this.state.email;
    user.password =
      this.state.password === this.state.confirmPassword
        ? this.state.password
        : (passwordMatch = false);

    console.log(user);

    let errors = {};
    let formIsValid = true;

    if (!user["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "*Please enter your First Name.";
    }

    if (user["firstName"] !== "") {
      if (!user["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!user["lastName"]) {
      formIsValid = false;
      errors["lastName"] = "*Please enter your Last Name.";
    }

    if (user["lastName"] !== "") {
      if (!user["lastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
    }

    if (!user["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }

    if (user["email"] !== "") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(user["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email Adderss.";
      }
    }

    if (!user["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (user["password"] !== "") {
      const pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,16}$/);
      if (!pattern.test(user['password'])) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      };
    }

    if (formIsValid) {
      API.signUp(user).then((res) => {
        console.log(`success! result: ${res.data}\n`);
        this.props.handleCloseSignup();
        this.props.handleOpenLogin();
        this.setState({ user: res.data.user });
      })
    } else {
      console.log("Form did not submit");
      this.setState({ errors: errors });
      console.log(errors);
    };
  };

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/home" />;
    } else {
      return (
        <Dialog
          open={this.props.open}
          onClose={this.props.handleCloseSignup}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To sign up please fill in the fields below.
            </DialogContentText>
            {this.state.errors["firstName"] === undefined ?
              <TextField
                value={this.state.firstName}
                onChange={this.handleOnChange}
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="string"
                fullWidth
              /> :
              <TextField
                error
                value={this.state.firstName}
                onChange={this.handleOnChange}
                autoFocus
                margin="dense"
                id="firstName"
                label={this.state.errors["firstName"]}
                type="string"
                fullWidth
              />}

            {this.state.errors["lastName"] === undefined ?
              <TextField
                value={this.state.lastName}
                onChange={this.handleOnChange}
                // autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                type="string"
                fullWidth
              /> :
              <TextField
                error
                value={this.state.lastName}
                onChange={this.handleOnChange}
                // autoFocus
                margin="dense"
                id="lastName"
                label={this.state.errors["lastName"]}
                type="string"
                fullWidth
              />
            }
            {this.state.errors["email"] === undefined ?
              <TextField
                value={this.state.email}
                onChange={this.handleOnChange}
                // autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="string"
                fullWidth
              /> :
              <TextField
                error
                value={this.state.email}
                onChange={this.handleOnChange}
                // autoFocus
                margin="dense"
                id="email"
                label={this.state.errors["email"]}
                type="string"
                fullWidth
              />
            }

            {this.state.errors["password"] === undefined ?
              <TextField
                value={this.state.password}
                onChange={this.handleOnChange}
                // autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
              /> :
              <TextField
                error
                value={this.state.password}
                onChange={this.handleOnChange}
                // autoFocus
                margin="dense"
                id="password"
                label={this.state.errors["password"]}
                type="password"
                fullWidth
              />
            }

            {this.state.password !== this.state.confirmPassword ?
              <TextField
                error
                value={this.state.confirmpass}
                onChange={this.handleOnChange}
                // autoFocus
                margin="dense"
                id="confirmPassword"
                label="*Passwords do not match"
                type="password"
                fullWidth
              /> :
              <TextField
                value={this.state.confirmpass}
                onChange={this.handleOnChange}
                // autoFocus
                margin="dense"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
              />
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseSignup} color="secondary">
              <Close />
              Cancel
            </Button>
            <Button onClick={this.handleSignUpAttempt} color="primary">
              <Done />
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      );
    };
  };
};

export default SignupDialog;
