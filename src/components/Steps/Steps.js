import React, {Component, useState} from "react";
import PropTypes from "prop-types";
import ListIcon from '@material-ui/icons/List';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTasksThunk, deleteStep } from "../../actions/steps";
import {Button} from "@material-ui/core";

const styles = theme => ({
    link: {
        textDecoration: 'none',
    },
    linkButton: {
        margin: theme.spacing.unit*2
    }
})

class  StepCreateModal extends Component {

    state = {
        name: '',
    }

    handleChange = (event, type) => {
        this.setState({
            [type]: event.target.value
        })
    }

    render() {
        const {handleClose, open, addNewStep} = this.props;
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Step</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(event) => this.handleChange(event,'name')}
                        value={this.state.name}
                        autoFocus
                        margin="dense"
                        label="Step"
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={()=>addNewStep(this.state.name)}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const NewStepItem = ({toggleModal}) => {
    return (
        <React.Fragment>
            <ListItem>
                <Button  onClick={toggleModal} color={"primary"}> Add new Step</Button>
            </ListItem>
        </React.Fragment>
    )
}

const SortableItem = SortableElement(({item}) =>(
    <ListItem>
        <ListItemAvatar>
            <ListIcon />
        </ListItemAvatar>
        <ListItemText
            primary={item}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>)
);



const SortableList = SortableContainer(({items}) => {
    return (
        <List>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} item={value} />
            ))}
        </List>
    );
});

class Steps extends Component {
    state = {
        items: ['Interview', 'Contract signed', 'Candidate in country', 'Placement complete (commissions earned)'],
        showModal: false,

    };
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    addNewStep = (item) => {
        const newItems = [...this.state.items, item];
        this.setState({
            ...this.state,
            items: newItems
        }, () => {

            this.setState({showModal : false})
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.demo}>
                            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
                            <NewStepItem toggleModal={this.toggleModal}/>
                            <StepCreateModal open={this.state.showModal} addNewStep={this.addNewStep} handleClose={this.toggleModal} />
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         steps: state.steps.steps,
//         loading: state.steps.loading
//     };
// };
export default withStyles(styles)(Steps);
// export default connect(
//     mapStateToProps,
//     { getTasksThunk, deleteStep }
// )(withStyles(styles)(Steps));