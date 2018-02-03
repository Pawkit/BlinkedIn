import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Label,
  Container,
  Row,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { hideModal } from '../../actions';

import API from '../../utils/API';

const initialJob = {
  title: '',
  dateApplied: new Date(),
  companyName: '',
  companyContact: '',
  companyWebsite: '',
  companyFacts: '',
  jobRequirements: '',
  jobResponsibilities: '',
  callBack: false,
  interview: false,
  dateInterview: new Date(),
  nameOfInterviewer: '',
  qualifications: '',
  benefits: '',
  salary: 0,
  notes: '',
  lastUpdate: new Date(),
};

class JobModal extends React.PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { job } = props.modal;

    this.state = {
      isOpen: false,
      submitted: false,
      type: 'create',
      status: 'idle',
      job: job || initialJob,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { modal } = nextProps;
    let { type } = this.state;
    let isOpen = true;

    if (modal.type === 'createJob') {
      // clears job modal form
      this.clearJob();
    } else if (modal.type === 'editJob') {
      type = 'edit';
    } else if (modal.type === 'viewJob') {
      type = 'view';
    } else {
      isOpen = false;
    }

    if (isOpen) {
      this.setState({
        isOpen,
        type,
        job: modal.job || initialJob,
      });
    }
  }

  onSave = () => {
    const {
      type,
      job,
    } = this.state;

    this.setState({
      status: 'saving',
    }, () => {
      if (type === 'create') {
        API.createJob({
          ...job,
          uid: this.props.auth.uid,
        }).then((res) => {
          this.setState({
            status: 'success',
            isOpen: false,
          });
          this.props.hideModal({ status: 'success' });
        }).catch((err) => {
          this.setState({
            status: 'error',
            submitted: true,
            message: err.errorMessage,
          });
        });
      } else {
        API.saveJob(job)
         .then((res) => {
          this.setState({
            status: 'success',
            isOpen: false,
          });
          this.props.hideModal({ status: 'success' });
        }).catch((err) => {
          this.setState({
            status: 'error',
            message: err.errorMessage,
          });
        });
      }
    });
  }

  // clears job from being selected
  clearJob() {
    this.setState({ job: initialJob });
  }

  toggle = () => {
    if (this.state.isOpen) {
      this.props.hideModal();
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      job: {
        ...this.state.job,
      [name]: value,
      },
    });
  };

  render() {
    const {
      type,
      status,
      job,
      message,
      submitted,
    } = this.state;
    const {
      title = '',
      dateApplied = new Date(),
      companyName = '',
      companyContact = '',
      companyWebsite = '',
      companyFacts = '',
      jobRequirements = '',
      jobResponsibilities = '',
      callBack = false,
      interview = false,
      dateInterview = new Date(),
      nameOfInterviewer = '',
      qualifications = '',
      benefits = '',
      salary = 0,
      notes = '',
      lastUpdate = new Date(),
    } = job;

    const viewmode = type === 'view';

    return (
      <Modal
        isOpen={this.state.isOpen}
        toggle={this.toggle}
      >
        <ModalBody>
          {
            status === 'error' &&
            <p>{message}</p>
          }
          { viewmode ?
            <Container>
              <Row>
                <Label>Title:</Label>&nbsp;
                <p>{title}</p>
              </Row>
              <Row>
                <Label>Applied Date:</Label>&nbsp;
                <p>{dateApplied}</p>
              </Row>
              <Row>
                <Label>Company Name:</Label>&nbsp;
                <p>{companyName}</p>
              </Row>
              <Row>
                <Label>Company Contact:</Label>&nbsp;
                <p>{companyContact}</p>
              </Row>
              <Row>
                <Label>Company Website:</Label>&nbsp;
                <p>{companyWebsite}</p>
              </Row>
              <Row>
                <Label>Company Facts:</Label>&nbsp;
                <p>{companyFacts}</p>
              </Row>
              <Row>
                <Label>Job Reqruiremens:</Label>&nbsp;
                <p>{jobRequirements}</p>
              </Row>
              <Row>
                <Label>Job Responsibilities:</Label>&nbsp;
                <p>{jobResponsibilities}</p>
              </Row>
              <Row>
                <Label>Callback:</Label>&nbsp;
                <p>{callBack ? 'Available' : 'Not Available'}</p>
              </Row>
              <Row>
                <Label>Interview:</Label>&nbsp;
                <p>{interview ? 'Done' : 'Preparing'}</p>
              </Row>
              <Row>
                <Label>Interview Date:</Label>&nbsp;
                <p>{dateInterview}</p>
              </Row>
              <Row>
                <Label>Name of Interviewer:</Label>&nbsp;
                <p>{nameOfInterviewer}</p>
              </Row>
              <Row>
                <Label>Qualifications:</Label>&nbsp;
                <p>{qualifications}</p>
              </Row>
              <Row>
                <Label>Benefits:</Label>&nbsp;
                <p>{benefits}</p>
              </Row>
              <Row>
                <Label>Salary:</Label>&nbsp;
                <p>{salary}</p>
              </Row>
              <Row>
                <Label>Notes:</Label>&nbsp;
                <p>{notes}</p>
              </Row>
              <Row>
                <Label>Last update:</Label>&nbsp;
                <p>{lastUpdate}</p>
              </Row>
            </Container>
            :
            <Container>
              <Input
                className="my-2"
                id="title"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                valid={title.length !== 0 || !submitted}
                onChange={this.handleInputChange}
              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="dateApplied"
                type="datetime"
                name="dateApplied"
                placeholder="Date applied to the Job"
                value={dateApplied}
                valid={dateApplied.length !== 0 || !submitted}
                onChange={this.handleInputChange}
              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="companyName"
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={companyName}
                valid={companyName.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="companyContact"
                type="text"
                name="companyContact"
                placeholder="Comapny contact"
                value={companyContact}
                valid={companyContact.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="companyWebsite"
                type="text"
                name="companyWebsite"
                placeholder="Company website"
                value={companyWebsite}
                valid={companyWebsite.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="companyFacts"
                type="text"
                name="companyFacts"
                placeholder="Company Facts"
                value={companyFacts}
                valid={companyFacts.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="jobRequirements"
                type="text"
                name="jobRequirements"
                placeholder="Job requriements"
                value={jobRequirements}
                valid={jobRequirements.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="jobResponsibilities"
                type="text"
                name="jobResponsibilities"
                placeholder="Job responsibilities"
                value={jobResponsibilities}
                valid={jobResponsibilities.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="callBack"
                    checked={callBack}
                    onChange={this.handleInputChange}
                  />{' '}
                  {'Call Back'}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="interview"
                    checked={interview}
                    onChange={this.handleInputChange}
                  />{' '}
                  {'Interview'}
                </Label>
              </FormGroup>
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="dateInterview"
                type="datetime"
                name="dateInterview"
                placeholder="Interview Date"
                value={dateInterview}
                valid={dateInterview.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="nameOfInterviewer"
                type="text"
                name="nameOfInterviewer"
                placeholder="Name of interviewer"
                value={nameOfInterviewer}
                valid={nameOfInterviewer.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="qualifications"
                type="text"
                name="qualifications"
                placeholder="Qualifications"
                value={qualifications}
                valid={qualifications.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label>Job Title</Label> */}
              <Input
                className="my-2"
                id="benefits"
                type="text"
                name="benefits"
                placeholder="Benefits"
                value={benefits}
                valid={benefits.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              <Label for="salary">Salary</Label>
              <Input
                className="my-2"
                id="salary"
                type="number"
                name="salary"
                value={salary}
                valid={salary >= 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label for="salary">Salary</Label> */}
              <Input
                className="my-2"
                id="notes"
                type="textarea"
                name="notes"
                placeholder="Notes"
                value={notes}
                valid={notes.length !== 0 || !submitted}
                onChange={this.handleInputChange}

              />
              {/* <Label for="salary">Salary</Label> */}
              <Input
                className="my-2"
                id="lastUpdate"
                type="datetime"
                name="lastUpdate"
                placeholder="Last Updated"
                value={lastUpdate}
                plaintext
              />
            </Container>
          }
        </ModalBody>
        <ModalFooter>
          {
            type !== 'view' &&
            <Button
              color="primary"
              onClick={this.onSave}
              disabled={status === 'saving' || title.length === 0 || salary <= 0 || companyName.length === 0}
            >
              Save
            </Button>
          }
          <Button
            color="secondary"
            onClick={this.toggle}
            disabled={status === 'saving'}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(JobModal);
