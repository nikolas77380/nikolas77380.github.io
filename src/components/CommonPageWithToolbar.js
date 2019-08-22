import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';

import ToolbarApp from './ToolBar';


const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
});

class CommonPageWithToolbar extends Component {
    render() {
        const {classes, children} = this.props;
        return (
            <div className={classes.root}>
            <ToolbarApp/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    {children}
                </main>
            </div>
        );

    }
}

export default withStyles(styles)(CommonPageWithToolbar)
