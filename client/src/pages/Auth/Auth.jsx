import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Form, Input, Button, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import { updateAuthState } from '../../actions';

import API from '../../utils/API';

import './Auth.css';

class Auth extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    updateAuthState: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    // Initial state properties.
    const type = props.match.path.split('/')[1];

    // Setting our component's initial state
    this.state = {
      status: 'idle',
      type,
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.match.path.split('/')[1],
    });
  }

  // Give a try to authenticate user
  login = () => {
    this.setState({ status: 'pending' }, () => {
      API.logIn({
        username: this.state.username,
        password: this.state.password,
      }).then((res) => {
        if (res.data.success) {
          this.props.updateAuthState({
            isAuthorised: true,
            uid: res.data.id,
          });
          this.props.history.push('/jobs');
        } else {
          this.setState({
            status: 'error',
            message: res.data.message,
          });
        }
      }).catch((err) => {
        this.setState({
          status: 'error',
          message: err.errorMessage,
        });
      });
    });
  };

  // Give a try to Register user
  register = () => {
    this.setState({ status: 'pending' }, () => {
      API.Register({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
      }).then((res) => {
        this.props.updateAuthState({
          isAuthorised: true,
          uid: res.data.id,
        });
        this.props.history.push('/jobs');
      }).catch((err) => {
        this.setState({
          status: 'error',
          message: err.errorMessage,
        });
      });
    });
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { type } = this.state;
    if (type === 'login') {
      this.login();
    } else {
      this.register();
    }
  };

  render() {
    const {
      type,
      status,
      name,
      username,
      password,
      confirmPassword,
      message,
    } = this.state;
    const disabled = type === 'login'
      ? !(status !== 'pending' && username && password)
      : !(status !== 'pending' && name && username && password && password === confirmPassword);
    const refText = type === 'login' ? 'Don\'t you have an account?' : 'Already have an account?';
    const linkText = type === 'login' ? 'Register' : 'Login';

    return (
      <div className="full-content d-flex justify-content-center align-items-center">
        <Form id="auth-form" className="b-5 px-3 text-center">
          <Label className="my-3 display-4">
            {type}
          </Label>
          {
            status === 'error' &&
            <p>{message}</p>
          }
          {
            type === 'register' &&
            <Input
              className="my-3"
              value={name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="name"
            />
          }
          <Input
            className="my-3"
            value={username}
            onChange={this.handleInputChange}
            name="username"
            placeholder="username"
          />
          <Input
            className="my-3"
            value={password}
            onChange={this.handleInputChange}
            name="password"
            type="password"
            placeholder="password"
          />
          {
            type === 'register' &&
            <Input
              className="my-3"
              value={confirmPassword}
              onChange={this.handleInputChange}
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
            />
          }
          <Row className="m-0 text-right">
            <span>{refText}&nbsp;&nbsp;</span>
            <Link to={`/${linkText}`}>
              <p>{linkText}...</p>
            </Link>
          </Row>
          <Button
            className="my-3"
            color="warning"
            disabled={disabled}
            onClick={this.handleFormSubmit}
            block
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateAuthState,
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(Auth));
