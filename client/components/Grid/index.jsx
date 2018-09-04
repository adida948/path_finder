import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateGrid } from '../../actions/grid';
import { rootUrl } from '../../../constants';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.mouseAction = null;
    this.autoRun = false;
    this.cellStyles = this.cellStyles.bind(this);
    this.run = this.run.bind(this);
    this.mouseEvent = this.mouseEvent.bind(this);
  }

  nextMove() {
    const {
      agent,
      grid,
      floor,
    } = this.props;

    agent.step();

    this.props.updateGrid({
      openList: agent.openList,
      closedList: agent.closedList,
      path: agent.path,
      currentCell: agent.currentCell,
      grid,
      floor,
    });
  }

  run() {
    const {
      agent,
      grid,
      floor,
    } = this.props;

    agent.run();
    this.props.updateGrid({
      openList: agent.openList,
      closedList: agent.closedList,
      path: agent.path,
      currentCell: agent.currentCell,
      grid,
      floor,
    });
  }

  reset() {
    const {
      agent,
      grid,
      floor,
    } = this.props;

    agent.reset();
    this.props.updateGrid({
      openList: agent.openList,
      closedList: agent.closedList,
      path: agent.path,
      currentCell: agent.currentCell,
      grid,
      floor,
    });

    if (this.autoRun) {
      this.run();
    }
  }

  mouseEvent(idx, evt) {
    return (evt) => {
      const {
        agent,
        grid,
        floor,
      } = this.props;

      if (evt.type === 'mouseup') {
        this.mouseAction = null;
        grid.cells[idx].removeProperty(['active']);
        this.props.updateGrid({
          grid,
          openList: agent.openList,
          closedList: agent.closedList,
          path: agent.path,
          currentCell: agent.currentCell,
          floor,
        });
        return;
      }

      // Ignore mouseover's without mousedown
      if (evt.buttons !== 1 && evt.type !== 'click') {
        this.mouseAction = null;
        return;
      }

      if (this.mouseAction === null) {
        if (this.props.grid.cells[idx].getProperty('startPosition')) {
          this.mouseAction = function (idx) {
            this.props.grid.removeAll('startPosition');
            this.props.grid.cells[idx].setProperty({ startPosition: true });
          };
        } else if (this.props.grid.cells[idx].getProperty('goalPosition')) {
          this.mouseAction = function (idx) {
            this.props.grid.removeAll('goalPosition');
            this.props.grid.cells[idx].setProperty({ goalPosition: true });
          };
        } else if (this.props.grid.cells[idx].getProperty('wall')) {
          this.mouseAction = function (idx) {
            this.props.grid.cells[idx].removeProperty(['wall']);
          };
        } else {
          this.mouseAction = function (idx) {
            this.props.grid.removeAll('goalPosition');
            this.props.grid.cells[idx].setProperty({ goalPosition: true });

            this.props.updateGrid({
              grid: this.props.grid,
              floor: this.props.floor,
            });
          };
        }
      }

      this.props.grid.cells[idx].setProperty({ active: true });
      this.mouseAction(idx);
      this.reset.bind(this);
    }
  }

  cellStyles(idx) {
    const {
      currentCell,
      path,
      closedList,
      grid,
    } = this.props;

    let arr = [];
    if (currentCell === idx) {
      arr.push('current');
    }
    if (path.indexOf(idx) >= 0) {
      arr.push('path');
    }
    if (closedList.indexOf(idx) >= 0) {
      arr.push('closedList');
    }

    if (grid.cells[idx].getProperty('wall')) {
      arr.push('wall');
    }

    arr = arr.concat(Object.keys(grid.cells[idx].properties));

    return arr;
  }

  autoRunEvent(evt) {
    this.autoRun = evt.target.checked;
    if (this.autoRun) {
      this.run();
    }
  }

  render() {
    const { grid, floor } = this.props;
    const cellSize = 15;
    
    if (grid) {
      const svgProps = {
        width: grid.width * cellSize + 1,
        height: grid.height * cellSize + 1,
      };

      return (
        <div className="grid">
          <div className="grid__map">
            <img src={`${rootUrl()}/images/${floor}.png`} alt="map" />
            <svg { ...svgProps } >
              {grid.cells.map((cell, idx) => {
                const cellStyles = this.cellStyles(idx);
                return (
                  <g
                    key={idx}
                    onMouseDown={this.mouseEvent(idx)}
                    onMouseOver={this.mouseEvent(idx)}
                    onMouseUp={this.mouseEvent(idx)}
                    onTouchEnd={this.mouseEvent(idx)}
                  >
                    <rect
                      x={(idx % grid.width) * cellSize + 1}
                      y={Math.floor(idx / this.props.grid.width) * cellSize + 1}
                      width={cellSize - 1}
                      height={cellSize - 1}
                      className={cellStyles.join(' ')}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
          <button onClick={this.run}>Find me!</button>
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
  currentCell: state.currentCell || 210,
  agent: state.agent,
  floor: state.floor,
});

Grid.propTypes = {
  grid: PropTypes.object.isRequired,
  openList: PropTypes.array.isRequired,
  closedList: PropTypes.array.isRequired,
  path: PropTypes.array.isRequired,
  currentCell: PropTypes.number.isRequired,
  agent: PropTypes.object.isRequired,
  floor: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  {
    updateGrid,
  },
)(Grid);
