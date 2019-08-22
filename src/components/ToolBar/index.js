import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {logOut} from '../../actions/auth';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  AppBar: {
    position:'fixed', top: 0
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export function ToolbarApp(props) {
  const { classes, history } = props;
  return (
    <React.Fragment>
      <AppBar position="static" className={classes.AppBar} >
        <Toolbar>
          {history.location.pathname !== '/' &&
          <IconButton onClick={()=> history.goBack()} className={classes.menuButton} color="inherit" aria-label="Menu">
            <ChevronLeftIcon/>
          </IconButton>
          }
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Mytefl
          </Typography>
          {history.location.pathname !== '/partners' &&
          <Button color="inherit" onClick={() => history.push('/partners')}>Partners</Button>
          }
          <Button color="inherit" onClick={() => props.logOut()}>Log Out</Button>
        </Toolbar>
      </AppBar>
      </React.Fragment>
  );
}

ToolbarApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        loggingIn: state.auth.loggingIn,
        loginError: state.auth.loginError,
    };
};

export default connect(mapStateToProps, {logOut})(withRouter(withStyles(styles)(ToolbarApp)));
