import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginByPassword } from "../../actions/auth";

import withStyles from "@material-ui/core/styles/withStyles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";

import { ErrorMessageBox } from "./components";

import logoImage from "./brand.svg";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  tpaper: {
    marginTop: theme.spacing.unit * 24,
    marginBottom: theme.spacing.unit * 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    border: "2px dashed orange"
  },
  logo: {
    margin: theme.spacing.unit,
    padding: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  login_footer: {
    paddingTop: theme.spacing.unit * 8
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
    // color: "rgb(204, 51, 51)",
  },
  wrapper: {
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: 0,
    marginLeft: -12
  },
  forgotLinkWrapper: {
    marginTop: theme.spacing.unit
  },
  forgotButton: {
    fontSize: "0.700rem"
  }
});

class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    this.props.loginByPassword(email, password);
  };

  render() {
    const { classes, loggingIn, loginError, mfaRequired } = this.props;
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <div className={classes.logo}>
              <img src={logoImage} alt="Mytefl logo" width="100%" />
            </div>

            {/*<Typography id="text-sign-in" variant="h5">Sign in</Typography>*/}

            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  name="email"
                  type="text"
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>

              {mfaRequired && (
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="mfaCode">MFA Code</InputLabel>
                  <Input name="mfaCode" type="number" placeholder="000000" />
                </FormControl>
              )}
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loggingIn}
                  className={classes.submit}
                >
                  Sign in
                </Button>
                {loggingIn && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <div className={classes.forgotLinkWrapper}>
                {/* <Button 
                                    className={classes.forgotButton}
                                    color="primary"
                                    component={Link}
                                    to="/forgot_password"
                                >
                                    Forgot password?
                                </Button> */}
              </div>
            </form>
            <ErrorMessageBox errorMsg={loginError} />
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginError: PropTypes.any,
  loggingIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    loggingIn: state.auth.loggingIn,
    loginError: state.auth.loginError
  };
};

export default connect(
  mapStateToProps,
  { loginByPassword }
)(withStyles(styles)(Login));
