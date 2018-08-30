import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from './Grid';
import Path from './Grid/Path';
import Header from './Header';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <Header />
        <Grid />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

Welcome.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Welcome);

