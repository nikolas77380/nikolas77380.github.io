import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SaveAlt from '@material-ui/icons/SaveAlt';
import {Config} from './../../config/Config';

const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
      margin: theme.spacing.unit * 2
  }
});

const LeadDetails = props => {
  const { classes } = props;

  const {
    id,
    country,
    city,
    address_1,
    postcode,
    email,
    phone,
    order_date,
  } = props.lead;
  const appId = props.appId;
  const files = props.files[appId] || [];
  return (
    <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant='h2'>Files</Typography>
                </Grid>
                <Grid item>
                  <List>
                    {files.map(el => {
                      return (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <SaveAlt />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<a target='_blank' href={`${Config.ProviderUrl}/files/download?userId=${id}&applicationId=${appId}&file=${el}`}>{el}</a>}
                                // secondary={secondary ? 'Secondary text' : null}
                            />
                          </ListItem>
                      )
                    })}
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant='h2'>Details</Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <Input id="country" value={country} />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Input id="city" value={city} />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="address_1">Address</InputLabel>
                    <Input id="address_1" value={address_1} />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="postcode">Post Code</InputLabel>
                    <Input id="postcode" value={postcode} />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="component-disabled">Email</InputLabel>
                    <Input id="component-disabled" value={email} />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" value={phone} />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="order_date">Order Date</InputLabel>
                    <Input id="order_date" value={order_date} />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
    </React.Fragment>
  );
};

LeadDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeadDetails);
