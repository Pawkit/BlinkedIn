import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { hideModal } from '../../actions';

import API from '../../utils/API';

class JobModal extends React.PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { job } = props.modal;
    const initialState = job ? { ...job } : {
      title: '',
      company: '',
      salary: 0,
      notes: '',
    };

    this.state = {
      isOpen: false,
      submitted: false,
      type: 'create',
      status: 'idle',
      ...initialState,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { modal } = nextProps;
    if (modal.type === 'createJob') {
      this.setState({
        isOpen: true,
        type: 'create',
      });
    } else if (modal.type === 'editJob') {
      this.setState({
        isOpen: true,
        type: 'edit',
        ...modal.job,
      });
    }
  }

  onClose = () => {
    this.setState({ isOpen: false });
    this.props.hideModal();
  }

  onSave = () => {
    const {
      type,
      _id,
      title,
      company,
      salary,
      notes,
    } = this.state;

    this.setState({
      status: 'saving',
    }, () => {
      if (type === 'create') {
        API.createJob({
          title,
          company,
          salary,
          notes,
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
        API.saveJob({
          _id,
          title,
          company,
          salary,
          notes,
        }).then((res) => {
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
      [name]: value,
    });
  };

  render() {
    const {
      status,
      title,
      company,
      salary,
      notes,
      message,
      submitted,
    } = this.state;

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
          <Input
            className="my-2"
            type="text"
            name="title"
            placeholder="your job title here..."
            value={title}
            valid={title.length !== 0 || !submitted}
            onChange={this.handleInputChange}
          />
          <Input
            className="my-2"
            type="text"
            name="company"
            placeholder="your company name here..."
            value={company}
            valid={company.length !== 0 || !submitted}
            onChange={this.handleInputChange}
          />
          <Input
            className="my-2"
            type="number"
            name="salary"
            value={salary}
            valid={salary > 0 || !submitted}
            onChange={this.handleInputChange}
          />
          <Input
            className="my-2"
            type="textarea"
            name="notes"
            placeholder="your job description here..."
            value={notes}
            valid={notes.length !== 0 || !submitted}
            onChange={this.handleInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.onSave}
            disabled={status === 'saving' || title.length === 0 || company.length === 0 || salary <= 0 || notes.length === 0}
          >
            Save
          </Button>
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
