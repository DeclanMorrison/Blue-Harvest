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

    if (typeof user["firstName"] !== "undefined") {
      if (!user["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!user["lastName"]) {
      formIsValid = false;
      errors["lastName"] = "*Please enter your Last Name.";
    }

    if (typeof user["lastName"] !== "undefined") {
      if (!user["lastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
    }

    if (!user["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }

    if (typeof user["email"] !== "undefined") {
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

    if (typeof user["password"] !== "undefined") {
      if (!user["password"].match(/^.*((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    if (formIsValid) {
      API.signUp(user).then((res) => {
          console.log(`success! result: ${res.data}\n`);
          this.props.handleCloseSignup();
          this.props.handleOpenLogin();
          this.setState({ redirect: true, user:res.data.user});
        })
    } 

    // this.setState({
    //   errors: errors
    // });
    // return formIsValid;
  };

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
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
            <TextField
              value={this.state.firstName}
              onChange={this.handleOnChange}
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="string"
              fullWidth
            />
            <TextField
              value={this.state.lastName}
              onChange={this.handleOnChange}
              // autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="string"
              fullWidth
            />
            <TextField
              value={this.state.email}
              onChange={this.handleOnChange}
              // autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="string"
              fullWidth
            />
            <TextField
              value={this.state.password}
              onChange={this.handleOnChange}
              // autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
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
    }

  }
}

export default SignupDialog;
