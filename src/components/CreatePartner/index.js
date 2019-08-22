import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createPartner } from './../../actions/partners';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing.unit*3
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    title: {
        margin: theme.spacing.unit*3,
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    wrapper: {
        position: 'relative',
    },
    buttons: {
        marginTop: '0.5rem',
    },
    exit: {
        position: 'absolute',
        top:'20px',
        right: 0
    }
  });

export const MessageNotify = ({data}) => {
    return (<Typography>{data}</Typography>);
}

export class CreatePartner extends React.Component {

    state = {
        partnerCreated: false,
        createError: false
    }

    handleCreate = (event) => {
        event.preventDefault();
        const form = event.target;
        const country = form.country.value;
        const companyName = form.companyName.value;
        const contactName = form.contactName.value;
        const email = form.email.value;
        const locations = form.locations.value;
        const notes = form.notes.value;
        this.props.createPartner({
            country,
            companyName,
            contactName,
            email,
            locations,
            notes
        });
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return {
            partnerCreated: nextProps.partnerCreated,
            createError: nextProps.createError,
        }
    }

    render() {
        const {classes, loading } = this.props;
        const {partnerCreated, createError} = this.state;

        if (partnerCreated) {
            this.formRef.reset();
        }

        return (
            <Paper className={classes.paper}>
                <div className={classes.exit}>
                    <Button onClick={this.props.closeModal}><ClearIcon /></Button>
                </div>
                <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                    {partnerCreated && <MessageNotify data='Partner Created'/>}
                    {createError && <MessageNotify data='Partner Not Created'/>}
                </Grid>
                <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                    <Typography variant="h5" gutterBottom>
                    Create New Partner
                    </Typography>
                </Grid>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleCreate} ref={el => this.formRef = el}>
                    <Grid container spacing={24} direction="row" justify="center" alignItems="center">
                        <Grid item xs={6} sm={8}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="country">Country</InputLabel>
                                <Input id="country" name="country" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="companyName">Company Name</InputLabel>
                                <Input id="companyName" name="companyName" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="contactName">Contact Name</InputLabel>
                                <Input id="contactName" name="contactName" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="email">Email ID</InputLabel>
                                <Input type="email" id="email" name="email" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={8}  >
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="locations">Locations Served</InputLabel>
                                <Input id="locations" name="locations" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="notes">Notes</InputLabel>
                                <Input id="notes" name="notes" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5} >
                            <div className={classes.wrapper}>
                            <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={false}
                            fullWidth
                            className={classes.buttons}> 
                                Create       
                            </Button>
                            {loading && <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />}
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        )
    }       
}

const mapStateToProps = state => {
    return {
      loading: state.partners.loading,
      partnerCreated: state.partners.partnerCreated,
      createError: state.partners.fetchError
    };
  };

export default connect(mapStateToProps, { createPartner })
                (withStyles(styles)(withRouter(CreatePartner)));