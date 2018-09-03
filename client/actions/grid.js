import { SELECT_FLOOR, UPDATE_GRID } from '../../constants';
import { socket } from './socket';

export const updateGrid = obj => () => {
  socket.emit(UPDATE_GRID, obj);
};

export const selectFloor = floor => (dispatch) => {
  dispatch({
    type: SELECT_FLOOR,
    payload: floor,
  });
};
