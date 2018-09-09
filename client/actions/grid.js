import { SELECT_FLOOR, UPDATE_GRID, SELECT_DESTINATION } from '../../constants';
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

export const selectDestination = destination => (dispatch) => {
  dispatch({
    type: SELECT_DESTINATION,
    payload: destination,
  });
};
