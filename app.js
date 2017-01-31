const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Game = require('./lib/game.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/deck', require('./controller'));

app.listen(3000, function () {
  console.log('Express running on port 3000!');
  var game = new Game();
  app.set('game', game);
});
