import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createShallow } from '@material-ui/core/test-utils';
import { withStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';

import {CreatePartner, MessageNotify} from './';
import Typography from "@material-ui/core/Typography";

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

const WrappedComponent = withStyles(styles)(CreatePartner);

// Enzyme is connected
configure({ adapter: new Adapter()});

describe('Testing Create Partner form', () => {
    let customShallow;

    beforeEach(() => {  // This is Mocha; in Jest, use beforeAll
        customShallow = createShallow();
    });

    it('should render creation form with 6 inputs', () => {

        const wrapper = customShallow(<WrappedComponent />);

        expect(wrapper.dive().find(Input)).toHaveLength(6);
    })

    it('should show message component', () => {
        const wrapper = shallow(<MessageNotify/>);

        wrapper.setProps({
            data: 'Partner Created'
        })

        expect(wrapper.find(Typography)).toHaveLength(1);
    })

});