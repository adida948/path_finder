import { FLOOR, END_POS, TOGGLE_END_POS, END_POS_ONLY } from '../../constants';
import { socket, initSocket } from './socket';

export const setEndPos = currentCell => (dispatch) => {
  socket.emit(END_POS, currentCell);
};

export const startSocket = () => (dispatch) => {
  initSocket(dispatch);
};

export const updateGrid = obj => (dispatch) => {
  socket.emit(END_POS, obj);
};

export const updateGridOnly = grid => (dispatch) => {
  socket.emit(END_POS_ONLY, grid);
};

export const toggleFloors = floor => (dispatch) => {
  dispatch({
    type: FLOOR,
    payload: floor,
  });
};
