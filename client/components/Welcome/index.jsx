import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initSocket } from '../../actions/socket';

import Grid from '../Grid';
import Nav from '../Nav';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.props.initSocket();
  }

  render() {
    return (
      <div className="welcome">
        <h1 className="title">Path Finder</h1>
        <Nav />
        <Grid />
      </div>
    );
  }
}

Welcome.propTypes = {
  initSocket: PropTypes.func.isRequired,
};

export default connect(
  null,
  { initSocket },
)(Welcome);
