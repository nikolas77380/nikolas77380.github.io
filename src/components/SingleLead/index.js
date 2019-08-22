import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { setSingleLead, connectPartner, completeStep, fetchPartnersByCountry, setApplication } from "./../../actions/singleLead";
import LeadDetails from "./LeadDetails";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {STEPS} from '../../constants/Steps';
import LeadStepper from './LeadStepper.js';

const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const PartnersList = ({ data, partnerId, onChangePartner }) => {
  const list = data.map(el => (
    <MenuItem key={el.id} value={el.id}>
      {el.contactName}
    </MenuItem>
  ));
  return (
    <Select
      value={partnerId}
      onChange={onChangePartner}
      inputProps={{
        name: "partner",
        id: "partner"
      }}
      fullWidth
    >
      <MenuItem key={"_empty"} value="">
        <em>None</em>
      </MenuItem>
      {list}
    </Select>
  );
};

const ApplicationsList = ({data, application, onChangeApplication}) => {
  const appId = application? application.id : '';
  const list = data.map(el => {
    return (
      <MenuItem key={el.id} value={el.id}>
        {el.country}
      </MenuItem>
    )
  }
  );
  return (
      <Select
          value={appId}
          onChange={onChangeApplication}
          inputProps={{
            name: "application",
            id: "application"
          }}
          fullWidth
      >
        <MenuItem key={"_empty"} value="" disabled>
          <em>Select App</em>
        </MenuItem>
        {list}
      </Select>
  );
}

class SingleLead extends React.Component {

  state = {
    partner: {},
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.setSingleLead(id);
  }

  handleChangePartner = event => {
    this.setState({
        partner: this.props.partners.find(el => el.id === event.target.value)
    });
  };


  handleChangeApplication = event => {
    const applicationSelected = this.props.lead.applications.find(el => el.id === event.target.value) || {}
    this.props.setApplication({id: event.target.value})
    this.props.fetchPartnersByCountry(applicationSelected.country);
  };

  handleCompleteStep = (stepToComplete) => {
    const partnerId = this.state.partner.id;
    const applicationId = this.props.applicationSelected.id;
    const stepDescription = stepToComplete;

    this.props.completeStep({
      stepDescription,
      partnerId,
      applicationId
    })
  }

  render() {
    const { classes, partners, lead, applicationSelected, files } = this.props;
    const { partner } = this.state;
    console.log(files)
    if (Object.keys(lead).length === 0 ) {
      return <CircularProgress />
    }
    return (
      <React.Fragment>
        <main className={classes.content}>
          <Paper className={classes.paper}>
            <Grid
              container
              spacing={24}
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Grid item>
                <Typography variant="h5" align="center">
                  {`${lead.first_name} ${lead.last_name}`}
                </Typography>
                </Grid>
                <Grid item>
                  <InputLabel>Select Application</InputLabel>
                  <ApplicationsList
                      data={lead.applications}
                      onChangeApplication={this.handleChangeApplication}
                      application={applicationSelected || {}}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <PartnersList data={partners || []} onChangePartner={this.handleChangePartner} partnerId={partner.id || applicationSelected.partnerId}/>
              </Grid>
              <Grid item>
                  <LeadStepper
                      handleComplete={this.handleCompleteStep}
                      completedStepIndex = {applicationSelected.completed_step}
                      completedStepDesc = {applicationSelected.step_description}
                      partnerId={partner.id || null}
                  />
              </Grid>
            </Grid>
          </Paper>
          {Object.keys(lead).length !== 0 && <LeadDetails lead={lead} files={files} appId={applicationSelected.id} />}
        </main>
      </React.Fragment>
    );
  }
}

SingleLead.propTypes = {
  classes: PropTypes.object.isRequired,
  lead: PropTypes.object.isRequired,
  partners: PropTypes.array.isRequired,
  setSingleLead: PropTypes.func.isRequired,
  connectPartner: PropTypes.func.isRequired,
  completeStep: PropTypes.func.isRequired
};

const mapDispatchToProps = state => {
  return {
    lead: state.leads.currentLead,
    files: state.leads.files,
    applicationSelected: state.leads.applicationSelected,
    partners: state.leads.partners,
    loading: state.leads.loading
  };
};

export default connect(
  mapDispatchToProps,
  { setSingleLead, connectPartner, completeStep, fetchPartnersByCountry, setApplication}
)(withRouter(withStyles(styles)(SingleLead)));
