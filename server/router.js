const path = require('path');

module.exports = (app) => {
  app.get('*', (req, res) => {
    const dirPath = path.resolve(__dirname).replace('server', '');
    const htmlPath = 'public/index.html';

    res.sendFile(dirPath + htmlPath);
  });
};
