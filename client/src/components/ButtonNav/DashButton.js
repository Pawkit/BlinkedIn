import React from 'react';
import { Button } from 'reactstrap';
// import PropTypes from 'prop-types';

const DashButton = (props) => {
  return (
      <div className="DashButton">
      <Button color="link">{props.text}</Button>
      </div>
  )
}

export default DashButton
