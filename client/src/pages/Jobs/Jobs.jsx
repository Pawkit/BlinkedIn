import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Card, CardTitle, CardSubtitle, CardText, Button, CardHeader, CardBody, Row, Col } from 'reactstrap';
import swal from 'sweetalert2';

import Nav from '../../components/Nav';
import JobModal from '../../modals/Job';
import API from '../../utils/API';
import { getCalendarLink } from '../../utils/gcal';

import { showModal, hideModal } from '../../actions';

import './Jobs.css';

class Jobs extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  state = {
    status: 'loading',
    jobs: [],
    message: '',
    count: 0
  }

  componentDidMount() {
    this.loadJobs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal.status === 'success') {
      this.loadJobs();
    }
  }

  onRemove = (job) => {
    swal({
      title: 'Do you really want to remove this Job?',
      text: `We are going to remove "${job.title}" and this can't be undone. Are you sure?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        API.deleteJob(job._id)
          .then((res) => {
            this.loadJobs();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  loadJobs = () => {
    API.getMyJobs(this.props.auth.uid)
      .then((res) => {
        this.setState({
          status: 'idle',
          jobs: res.data.jobs,
        });
        this.props.hideModal();
      }).catch((err) => {
        this.setState({
          status: 'error',
          message: err.errorMessage,
        });
      });
  }

  handleClick(job, increment) {
    job.points += increment;
    API.updateJob(job._id, job)
      .then( res => {
      console.log(res.data);
      this.setState({
        count: this.state.count + 1
      })
    })
}


//store upvotes in state
//then in res of updatejobs you want to use the saved of upvotes and increment it by 1
//get the upvote in state and store it in the backend
//get and put post function




  render() {
    const { jobs, status, message } = this.state;
    const { showModal } = this.props;
    const { uid } = this.props.auth;

    return (
      <div className="full-content">
        <Nav />
        <JobModal />
        <Container className="jobPanel p-3 my-4">
          <h1 className="text-center p-3" >Your Dashboard</h1>
          {
            status === 'error' &&
            <p>{message}</p>
          }
          {
            jobs.map(job => (
              <Card key={Math.random()} className="my-2">
                <CardHeader>
                  <Row>
                    <Col>
                      <CardTitle>{job.title}</CardTitle>
                      <CardSubtitle>{job.companyName}</CardSubtitle>
                    </Col>
                    <Col className="ml-auto">
                      <Row className="h-100 justify-content-end align-items-center">
                      <a href={getCalendarLink(job)} target="_blank">
                           <Button
                             className="mx-2"
                             onClick={() => {return false;}}
                             color="success"
                           >
                             Add to calendar
                           </Button>
                           </a>
                        <Button
                          className="mx-2"
                          color="success"
                          onClick={() => showModal({ type: 'viewJob', job })}
                          disabled={status === 'saving'}
                        >
                          View
                        </Button>
                        <Button
                          className="mx-2"
                          color="warning"
                          onClick={() => showModal({ type: 'editJob', job })}
                          disabled={status === 'saving'}
                        >
                          Edit
                        </Button>
                        <Button
                          className="mx-2"
                          color="danger"
                          onClick={() => this.onRemove(job)}
                          disabled={status === 'saving'}
                        >
                          Remove
                        </Button>
                        <Button
                          className="mx-2"
                          onClick={() => this.handleClick(job, 1)}
                          color="success"
                        >
                          Like
                        </Button>
                        <Button
                          className="mx-2"
                          onClick={() => this.handleClick(job, -1)}
                          color="success"
                        >
                          Dislike
                        </Button>
                        <span>{job.points}</span>
                      </Row>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <CardText>{job.notes}</CardText>
                </CardBody>
              </Card>
            ))
          }
        </Container>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal,
  hideModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
