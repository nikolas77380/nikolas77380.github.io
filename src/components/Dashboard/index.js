import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CustomizedTable from './DashboardTable';
import { getTasksThunk } from "../../actions/dashboard";

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.getTasksThunk();
    }
    render(){
      const {leads} = this.props;
        return (
            <CustomizedTable data={leads} />
        )
    }
}

const mapStateToProps = state => {
    return {
      leads: state.dashboard.leads
    };
  };
  
  export default connect(
    mapStateToProps,
    { getTasksThunk }
  )(Dashboard);