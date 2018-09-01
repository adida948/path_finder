const { io } = require('../index');
const { PING_PONG, END_POS } = require('../../constants');

module.exports = (socket) => {
  socket.on(END_POS, (obj) => {
    io.emit(END_POS, obj);
  });

  socket.on(PING_PONG, () => {});
};
