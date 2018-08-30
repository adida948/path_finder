import { END_POS, TOGGLE_END_POS } from '../../constants';
import { socket, initSocket } from './socket';

export const setEndPos = cellIndex => dispatch => {
  initSocket(dispatch);
  socket.emit(END_POS, cellIndex);

  dispatch({
    type: END_POS,
    payload: cellIndex,
  });
};

export const toggleEndPos = bool => dispatch => {
  dispatch({
    type: TOGGLE_END_POS,
    payload: bool,
  });
};