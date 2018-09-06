module.exports = {
  SELECT_FLOOR: 'SELECT_FLOOR',
  UPDATE_GRID: 'UPDATE_GRID',
  SELECT_DESTINATION: 'SELECT_DESTINATION',
  SOCKET_EVENTS: [
    'UPDATE_GRID',
  ],
  PING_PONG: 'PING_PONG',
  rootUrl: () => process.env.ROOT_URL || 'http://localhost:3000',
};

