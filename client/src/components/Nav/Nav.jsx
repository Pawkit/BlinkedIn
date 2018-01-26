import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Container } from 'reactstrap';
import PropTypes from 'prop-types';

import JobsNav from './components/JobsNav';

import { clearAuthState, showModal } from '../../actions';

class Header extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    clearAuthState: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  state = {
    isOpen: false,
  }

  onCreateJob = () => {
    this.props.showModal({ type: 'createJob' });
  }

  onLogOut = () => {
    this.props.clearAuthState();
    this.props.history.push('/login');
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Container className="p-0" fluid>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Blinked In</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Switch>
              <Route
                path="/jobs"
                component={() => (
                  <JobsNav
                    createJob={this.onCreateJob}
                    logout={this.onLogOut}
                  />
                )}
              />
            </Switch>
          </Collapse>
        </Navbar>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  clearAuthState,
  showModal,
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(Header));
