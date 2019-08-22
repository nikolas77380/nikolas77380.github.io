import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {ToolbarApp} from './index';

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

const WrappedComponent = withStyles(styles)(ToolbarApp);
// Enzyme is connected
configure({ adapter: new Adapter()});

describe('ToolBar', () => {

    it('should render one item if not authenticated', () => {

        const wrapper = shallow(<WrappedComponent />);
        wrapper.setProps({
            history: {
                location: {
                    pathname: '/'
                }
            }
        })
        expect(wrapper.dive().find(Typography)).toHaveLength(1);
    })

});

