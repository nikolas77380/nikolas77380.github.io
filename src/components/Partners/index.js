import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import CreatePartner from './../CreatePartner';
import CustomizedTable from "./PartnersTable";
import { getTasksThunk } from "../../actions/partners";

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
  linkButton: {
    margin: theme.spacing.unit*2
  },
  modal: {
    width: '60%',
    marginLeft: '20%'
  },
  dialogContent: {
    padding: 0
  }
})

class Partners extends React.Component {
  static propTypes = {
    partners: PropTypes.object.isRequired
  };

  state = {
    openModal: false
  }

  constructor(props) {
    super(props);
    this.getPartners();
  }
  componentDidMount() {
    this.getPartners();
  }
  getPartners = () => {
    this.props.getTasksThunk();
  }
  openModal = () => {
    this.setState({
      openModal: !this.state.openModal
    }, () => {
      this.getPartners();
    })
  }
  render() {
    const { loading, partners, classes } = this.props;
    if (loading) {
      return <CircularProgress />
    }
    return (
      <React.Fragment>
          <Button className={classes.linkButton} variant="contained" color="primary" onClick={this.openModal}>Create Partner</Button>
          <Modal open={this.state.openModal} className={classes.modal} disableAutoFocus={true}>
            <DialogContent className={classes.dialogContent}>
              <CreatePartner closeModal={this.openModal} />
            </DialogContent>
          </Modal>
        {!loading && <CustomizedTable data={partners} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    partners: state.partners.partners,
    loading: state.partners.loading
  };
};

export default connect(
  mapStateToProps,
  { getTasksThunk }
)(withStyles(styles)(Partners));
