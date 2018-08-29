import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PF from 'pathfinding';

import { rootUrl } from '../../constants';

class Floor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: new PF.Grid(100, 100),
      finder: new PF.DijkstraFinder(),
      path: null,
      startPos: [0, 0],
      endPos: null,
    };
  // finder.findPath(0, 0, 8, 8, this.grid);
    // this.row = 
  }
  
  handleClick() {
    this.path
  }

  render() {
    return (
      <div className="floor">
        <div className="floor__grid">
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

Floor.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Floor);
