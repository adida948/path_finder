import { TOGGLE_APP, END_POS, FLOOR } from '../../constants';
import { auditoriumWall, floorWall } from '../utils';
import { SearchGrid, Agent, GridCell } from '../components/Grid/astar';

const grid = new SearchGrid(25, 25);
const auditoriumStart = 527;
const floorStart = 210;
grid.cells[floorStart].setProperty({ startPosition: true });
grid.cells[2].setProperty({ goalPosition: true });
for (let i = 0; i < auditoriumWall.length; i++) {
  grid.cells[floorWall[i]].setProperty({ wall: true });
}

const agent = new Agent(grid);

const initialState = {
  endPos: 211,
  endPosBool: false,
  app: false,
  grid,
  agent,
  openList: agent.openList,
  closedList: agent.closedList,
  path: agent.path,
  currentCell: agent.currentCell,
  floor: 'floor',
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case END_POS:
      const width = 25;
      const height = 25;
      const numCells = width * height;
      let goalPos;

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
          payload.grid.cells[auditoriumStart].setProperty({ startPosition: true });
        }
      } else {
        for (let i = 0; i < floorWall.length; i++) {
          payload.grid.cells[floorWall[i]].setProperty({ wall: true });
          payload.grid.cells[floorStart].setProperty({ startPosition: true });
        }
      }

      return {
        ...state,
        ...payload,
        agent: new Agent(payload.grid),
      };
    case TOGGLE_APP:
      return {
        ...state,
        app: payload,
      };
    case FLOOR:
      return {
        ...state,
        floor: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
