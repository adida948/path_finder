module.exports = {
  FLOOR: 'FLOOR',
  TOGGLE_END_POS: 'TOGGLE_END_POS',
  END_POS: 'END_POS',
  SOCKET_EVENTS: [
    'END_POS',
  ],
  PING_PONG: 'PING_PONG',
  rootUrl: () => process.env.ROOT_URL || 'http://localhost:3000',
  TOGGLE_APP: 'TOGGLE_APP',
};

