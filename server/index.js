const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const router = require('./router');
const { seedTheTalks, seedMaria } = require('./services/seeds');

module.exports = { io };
const socketManager = require('./services/socketManager');

const mongodbServer = process.env.MONGO_AMEXMEETS || 'mongodb://localhost:27017/amexmeets';
mongoose.connect(mongodbServer, () => {
  // mongoose.connection.db.dropDatabase();
  seedTheTalks();
  seedMaria();
});
mongoose.set('debug', true);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
router(app);

io.on('connection', socketManager);

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
