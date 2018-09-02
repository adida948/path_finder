import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startSocket } from '../actions/grid';

import Grid from './Grid';
import Header from './Header';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.props.startSocket();
  }

  render() {
    return (
      <div className="welcome">
        <Header />
        <Grid />
      </div>
    );
  }
}

Welcome.propTypes = {
  startSocket: PropTypes.func.isRequired,
};

export default connect(null, { startSocket })(Welcome);

