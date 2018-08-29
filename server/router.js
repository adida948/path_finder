const path = require('path');
const passport = require('passport');
const { jwtLogin, localLogin } = require('./services/passport');
const { getMessages, sendMessage } = require('./controllers/messages');
const { getPrivateMessages, sendPrivateMessage } = require('./controllers/privateMessage');
const {
  logInUser,
  removeBookMark,
  signUpUser,
} = require('./controllers/users');

passport.use(jwtLogin);
passport.use(localLogin);

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogIn = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // Users routes
  app.post('/api/bookmark', removeBookMark);
  app.post('/api/login', requireLogIn, logInUser);
  app.post('/api/signup', signUpUser);

  // Messages routes
  app.get('/api/messages', requireAuth, getMessages);
  app.get('/api/messages_private', requireAuth, getPrivateMessages);
  app.post('/api/send', sendMessage);
  app.post('/api/send_private', sendPrivateMessage);
  
  app.get('*', (req, res) => {
  const dirPath = path.resolve(__dirname).replace('server', '');
  const htmlPath = 'public/index.html';

  res.sendFile(dirPath + htmlPath);
});
};
