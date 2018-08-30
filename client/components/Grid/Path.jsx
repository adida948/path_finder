import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PF from 'pathfinding';

class Path extends Component {
  constructor(props) {
    super(props);

    this.grid = new PF.Grid(10, 10);
    this.finder = new PF.AStarFinder();
    this.path = this.finder.findPath(1, 2, 4, 2, this.grid);
    // this.cellStyles = this.cellStyles.bind(this);
  }
  // cellStyles(cellIndex) {
  //   let cellStyles = [];
  //   if (this.state.currentCell === cellIndex) {
  //     cellStyles.push('current');
  //   }
  //   if (this.state.path.indexOf(cellIndex) >= 0) {
  //     cellStyles.push('path');
  //   }
  //   if (this.state.closedList.indexOf(cellIndex) >= 0) {
  //     cellStyles.push('closedList');
  //   }
  //   if (this.state.openList.indexOf(cellIndex) >= 0) {
  //     cellStyles.push('openList');
  //   }
  //   if (this.state.grid.cells[cellIndex].getProperty('wall')) {
  //     cellStyles.push('wall');
  //   }
  // 
  //   cellStyles = cellStyles.concat(Object.keys(this.state.grid.cells[cellIndex].properties));
  // 
  //   return cellStyles;
  // }
  
  render() {
    const cellSize = 30;

    return (
      <div className="path">
        <svg
          className={'mouseActive'}
          width={this.grid.width * cellSize + 1}
          height={this.grid.height * cellSize + 1}
        >
          {this.path.map((cell, cellIndex) => {
            return (
              <g
                key={cellIndex}
              >
                <rect
                  x={(cellIndex % this.grid.width) * cellSize + 1}
                  y={Math.floor(cellIndex / this.grid.width) * cellSize + 1}
                  width={cellSize - 1}
                  height={cellSize - 1}
                  className={'wall'}
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

Path.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Path);
