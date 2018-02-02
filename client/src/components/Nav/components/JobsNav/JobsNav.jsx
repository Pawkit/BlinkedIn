import React from 'react';
import { Nav, NavItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const JobsNav = ({ logout, createJob }) => (
  <Nav className="ml-auto" navbar>
    <NavItem className="m-2">
      <Button
        color="info"
        onClick={createJob}
        outline
      >
        Create
      </Button>
    </NavItem>
    <NavItem className="m-2">
      <Button
        color="info"
        onClick={logout}
        outline
      >
        Log Out
      </Button>
    </NavItem>
  </Nav>
);


JobsNav.propTypes = {
  logout: PropTypes.func.isRequired,
  createJob: PropTypes.func.isRequired,
};

export default JobsNav;
