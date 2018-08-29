import React, { Component } from 'react';

import { SearchGrid, Agent } from './astar';
import { rootUrl } from '../../../constants';

class App extends Component {
  constructor() {
    super();
    // Create grid and declate default start and goal positions
    this.grid = new SearchGrid(30,30);
    this.grid.cells[1].setProperty({ 'startPosition': true });
    // this.grid.cells[3].setProperty({ 'goalPosition': true });
    this.agent = new Agent(this.grid);
    this.state = {
      grid: this.grid,
      openList: this.agent.openList,
      closedList: this.agent.closedList,
      path: this.agent.path,
      currentCell: this.agent.currentCell,
    }
    
    this.mouseAction = null;
    this.autoRun = false;
  }

  nextMove() {
    this.agent.step();
    this.setState({
      openList: this.agent.openList,
      closedList: this.agent.closedList,
      path: this.agent.path,
      currentCell: this.agent.currentCell
    });
  }
  
  run() {
    this.agent.run();
    this.setState({
      openList: this.agent.openList,
      closedList: this.agent.closedList,
      path: this.agent.path,
      currentCell: this.agent.currentCell
    });
  }

  reset() {
    this.agent.reset();
    this.setState({
      openList: this.agent.openList,
      closedList: this.agent.closedList,
      path: this.agent.path,
      currentCell: this.agent.currentCell,
      grid: this.grid,
    });
    
    if (this.autoRun) {
      this.run();
    }
  }
  
  mouseEvent(cellIndex, evt) {
    if (evt.type === 'mouseup') {
      console.log(cellIndex);
      this.mouseAction = null;
      this.grid.cells[cellIndex].removeProperty(['active']);
      this.grid.cells[cellIndex].setProperty({ 'goalPosition': true });
      this.agent = new Agent(this.grid);
      this.setState({
        grid: this.grid
      });
      return;
    }

    // Ignore mouseover's without mousedown
    if (evt.buttons !== 1 && evt.type !== 'click') {
      this.mouseAction = null;
      return;
    }

    if (this.mouseAction == null) {
      if (this.grid.cells[cellIndex].getProperty('startPosition')) {
        this.mouseAction = function(cellIndex) {
          this.grid.removeAll('startPosition');
          this.grid.cells[cellIndex].setProperty({ 'startPosition': true });
        }
      } else if (this.grid.cells[cellIndex].getProperty('goalPosition')) {
        this.mouseAction = function (cellIndex) {
          this.grid.removeAll('goalPosition');
          this.grid.cells[cellIndex].setProperty({ 'goalPosition': true });
        };
      } else if (this.grid.cells[cellIndex].getProperty('wall')) {
        this.mouseAction = function(cellIndex) {
          this.grid.cells[cellIndex].removeProperty(['wall']);
        };
      } else {
        this.mouseAction = function(cellIndex) {
          this.grid.cells[cellIndex].setProperty({ 'wall': true });
        };
      }
    }

    this.grid.cells[cellIndex].setProperty({ 'active': true });
    this.mouseAction(cellIndex);
    this.reset();
  }

  cellStyles(cellIndex) {
    let cellStyles = [];
    if (this.state.currentCell === cellIndex) {
      cellStyles.push('current');
    }
    if (this.state.path.indexOf(cellIndex) >= 0) {
      cellStyles.push('path');
    }
    if (this.state.closedList.indexOf(cellIndex) >= 0) {
      cellStyles.push('closedList');
    }
    if (this.state.openList.indexOf(cellIndex) >= 0) {
      cellStyles.push('openList');
    }
    if (this.state.grid.cells[cellIndex].getProperty('wall')) {
      cellStyles.push('wall');
    }
    
    cellStyles = cellStyles.concat(Object.keys(this.state.grid.cells[cellIndex].properties));

    return cellStyles;
  }
  
  autoRunEvent(evt) {
    this.autoRun = evt.target.checked;
    if (this.autoRun) {
      this.run();
    }
  }

  render() {
    let cellSize = 30;
    // <img id="floor" src={`http://10.89.27.55:3000/images/floor.png`} alt="floor" />

    return (
      <div className="demo">

        <svg className={ this.state.mouseActive ? 'mouseActive' : '' } width={(this.state.grid.width*cellSize)+1} height={(this.state.grid.height*cellSize)+1}>{
          this.state.grid.cells.map((cell, cellIndex) => {
            let cellStyles = this.cellStyles(cellIndex);
            return (
              <g key={cellIndex}
                onMouseDown={this.mouseEvent.bind(this, cellIndex)}
                onMouseOver={this.mouseEvent.bind(this, cellIndex)}
                onMouseUp={this.mouseEvent.bind(this, cellIndex)}>
              <rect               
                x={((cellIndex%this.grid.width)*cellSize)+1}
                y={(Math.floor(cellIndex/this.grid.width)*cellSize)+1}
                width={cellSize-1}
                height={cellSize-1}
                className={cellStyles.join(' ')} />
                { this.agent.cellData[cellIndex] && !cellStyles.some(r=> ['startPosition', 'goalPosition'].indexOf(r) >= 0) &&
                  <text
                    fontSize={10}
                    x={((cellIndex%this.state.grid.width)*cellSize)+6}
                    y={(Math.floor(cellIndex/this.state.grid.width)*cellSize)+20}>
                      {this.agent.cellData[cellIndex].f }
                  </text>
                }
              </g>
            )
          })
        }</svg>
        <button onClick={this.run.bind(this)}>Run</button>{ " " }
      </div>
    );
  }
}

export default App;
