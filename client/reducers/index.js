import { UPDATE_GRID, SELECT_FLOOR } from '../../constants';
import { auditoriumWall, floorWall } from '../utils';
import { SearchGrid, Agent, GridCell } from '../components/Grid/astar';

const generateInitialState = (width, height) => {
  const grid = new SearchGrid(width, height);
  const auditoriumStart = 527;
  const floorStart = 210;
  grid.cells[floorStart].setProperty({ startPosition: true });
  grid.cells[2].setProperty({ goalPosition: true });
  for (let i = 0; i < floorWall.length; i++) {
    grid.cells[floorWall[i]].setProperty({ wall: true });
  }
  
  const agent = new Agent(grid);
  
  return ({
    endPos: 211,
    endPosBool: false,
    app: false,
    grid,
    agent,
    openList: agent.openList,
    closedList: agent.closedList,
    path: agent.path,
    currentCell: agent.currentCell || floorStart,
    floor: 'floor',
  });
}

const initialState = generateInitialState(25, 25);

const rootReducer = (state = initialState, { type, payload }) => {
  const width = 25;
  const height = 25;
  const numCells = width * height;
  let goalPos;

  switch (type) {
    case UPDATE_GRID:
      for (let i = 0; i < numCells; i++) {
        if (payload.grid.cells[i].properties.goalPosition) {
          goalPos = i;
          payload.grid.cells[i] = new GridCell(payload.grid.cells[i].properties);
        }
      }

      payload.grid = new SearchGrid(25, 25);
      payload.grid.cells[goalPos].setProperty({ goalPosition: true });

      if (payload.floor === 'aud') {
        for (let i = 0; i < auditoriumWall.length; i++) {
          payload.grid.cells[auditoriumWall[i]].setProperty({ wall: true });
          payload.grid.cells[527].setProperty({ startPosition: true });
        }
      } else {
        for (let i = 0; i < floorWall.length; i++) {
          payload.grid.cells[floorWall[i]].setProperty({ wall: true });
          payload.grid.cells[210].setProperty({ startPosition: true });
        }
      }

      return {
        ...state,
        ...payload,
        agent: new Agent(payload.grid),
      };
    case SELECT_FLOOR:
      return {
        ...state,
        floor: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
