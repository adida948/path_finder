import { FLOOR, END_POS } from '../../constants';
import { socket, initSocket } from './socket';

export const setEndPos = currentCell => () => {
  socket.emit(END_POS, currentCell);
};

export const startSocket = () => (dispatch) => {
  initSocket(dispatch);
};

export const updateGrid = obj => () => {
  socket.emit(END_POS, obj);
};

export const toggleFloors = floor => (dispatch) => {
  dispatch({
    type: FLOOR,
    payload: floor,
  });
};
