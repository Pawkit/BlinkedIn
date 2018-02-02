import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

const RestrictedRoute = ({ isAuthorised, type, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      (isAuthorised && type === 'private') || (!isAuthorised && type === 'public')
        ? (<Component {...props} />)
        : (<Redirect to={{
          pathname: type === 'private' ? '/login' : (props.location.state ? props.location.state.from.pathname : '/login'),
          search: `from=${props.location.pathname}`,
          state: { from: props.location },
        }}
        />
        )
    )}
  />
);

RestrictedRoute.propTypes = {
  isAuthorised: PropTypes.bool.isRequired,
  type: PropTypes.string,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

RestrictedRoute.defaultProps = {
  type: 'public',
};

const mapStateToProps = state => ({
  isAuthorised: state.auth.isAuthorised,
});

export default withRouter(connect(mapStateToProps, null)(RestrictedRoute));
