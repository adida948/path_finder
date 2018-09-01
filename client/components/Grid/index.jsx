import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateGrid } from '../../actions/grid';
import { rootUrl } from '../../../constants';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.mouseAction = null;
    this.autoRun = false;
    this.cellStyles = this.cellStyles.bind(this);
  }

  nextMove() {
    this.props.agent.step();
    this.props.updateGrid({
      openList: this.props.agent.openList,
      closedList: this.props.agent.closedList,
      path: this.props.agent.path,
      currentCell: this.props.agent.currentCell,
      grid: this.props.grid,
      floor: this.props.floor,
    });
  }

  run() {
    this.props.agent.run();
    this.props.updateGrid({
      openList: this.props.agent.openList,
      closedList: this.props.agent.closedList,
      path: this.props.agent.path,
      currentCell: this.props.agent.currentCell,
      grid: this.props.grid,
      floor: this.props.floor,
    });
  }

  reset() {
    this.props.agent.reset();
    this.props.updateGrid({
      openList: this.props.agent.openList,
      closedList: this.props.agent.closedList,
      path: this.props.agent.path,
      currentCell: this.props.agent.currentCell,
      grid: this.props.grid,
      floor: this.props.floor,
    });

    if (this.autoRun) {
      this.run();
    }
  }

  mouseEvent(cellIndex, evt) {
    if (evt.type === 'mouseup') {
      this.mouseAction = null;
      this.props.grid.cells[cellIndex].removeProperty(['active']);
      this.props.updateGrid({
        grid: this.props.grid,
        openList: this.props.agent.openList,
        closedList: this.props.agent.closedList,
        path: this.props.agent.path,
        currentCell: this.props.agent.currentCell,
        floor: this.props.floor,
      });
      return;
    }

    // Ignore mouseover's without mousedown
    if (evt.buttons !== 1 && evt.type !== 'click') {
      this.mouseAction = null;
      return;
    }

    if (this.mouseAction === null) {
      if (this.props.grid.cells[cellIndex].getProperty('startPosition')) {
        this.mouseAction = function (cellIndex) {
          this.props.grid.removeAll('startPosition');
          this.props.grid.cells[cellIndex].setProperty({ startPosition: true });
        };
      } else if (this.props.grid.cells[cellIndex].getProperty('goalPosition')) {
        this.mouseAction = function (cellIndex) {
          this.props.grid.removeAll('goalPosition');
          this.props.grid.cells[cellIndex].setProperty({ goalPosition: true });
        };
      } else if (this.props.grid.cells[cellIndex].getProperty('wall')) {
        this.mouseAction = function (cellIndex) {
          this.props.grid.cells[cellIndex].removeProperty(['wall']);
        };
      } else {
        this.mouseAction = function (cellIndex) {
          this.props.grid.removeAll('goalPosition');
          this.props.grid.cells[cellIndex].setProperty({ goalPosition: true });

          this.props.updateGrid({
            grid: this.props.grid,
            floor: this.props.floor,
          });
        };
      }
    }

    this.props.grid.cells[cellIndex].setProperty({ active: true });
    this.mouseAction(cellIndex);
    this.reset.bind(this);
  }

  cellStyles(cellIndex) {
    let arr = [];
    if (this.props.currentCell === cellIndex) {
      arr.push('current');
    }
    if (this.props.path.indexOf(cellIndex) >= 0) {
      arr.push('path');
    }
    if (this.props.closedList.indexOf(cellIndex) >= 0) {
      arr.push('closedList');
    }

    if (this.props.grid.cells[cellIndex].getProperty('wall')) {
      arr.push('wall');
    }

    arr = arr.concat(Object.keys(this.props.grid.cells[cellIndex].properties));

    return arr;
  }

  autoRunEvent(evt) {
    this.autoRun = evt.target.checked;
    if (this.autoRun) {
      this.run();
    }
  }

  render() {
    const cellSize = 15;

    if (this.props.grid) {
      return (
        <div className="grid">
          <div id="map">
            <img id="floor" src={`${rootUrl()}/images/${this.props.floor}.png`} alt="floor" />
            <svg
              className={this.props.mouseActive ? 'mouseActive' : ''}
              width={this.props.grid.width * cellSize + 1}
              height={this.props.grid.height * cellSize + 1}
            >
              {this.props.grid.cells.map((cell, cellIndex) => {
                const cellStyles = this.cellStyles(cellIndex);
                console.log(cellSize);
                return (
                  <g
                    key={cellIndex}
                    onMouseDown={this.mouseEvent.bind(this, cellIndex)}
                    onMouseOver={this.mouseEvent.bind(this, cellIndex)}
                    onMouseUp={this.mouseEvent.bind(this, cellIndex)}
                    onTouchEnd={this.mouseEvent.bind(this, cellIndex)}
                  >
                    <rect
                      x={(cellIndex % this.props.grid.width) * cellSize + 1}
                      y={Math.floor(cellIndex / this.props.grid.width) * cellSize + 1}
                      width={cellSize - 1}
                      height={cellSize - 1}
                      className={cellStyles.join(' ')}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
          <button id="runBtn" onClick={this.run.bind(this)}>
            Find me!
          </button>{' '}
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  grid: state.grid,
  openList: state.openList,
  closedList: state.closedList,
  path: state.path,
  currentCell: state.currentCell,
  agent: state.agent,
  floor: state.floor,
});

export default connect(
  mapStateToProps,
  {
    updateGrid,
  },
)(Grid);
