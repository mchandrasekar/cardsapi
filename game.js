const Deck = require('./deck.js');
const _ = require('lodash');

var Hand = function () {
  return new Array();
};

var Player = function (name) {
  this.name = name;
  this.hand = new Hand();
};

var Game = function (numberOfPlayers, numberOfDecks) {
  this.players = new Array();
  this.deck = new Deck();
};

Game.prototype.addPlayer = function (name) {
  this.players.push(new Player(name));
};

Game.prototype.getPlayer = function (name) {
  return _.find(this.players, function (player) { return player.name === name; });
};

Game.prototype.getCards = function (playerName, numberOfCards) {
  const player = this.getPlayer(playerName);
  player.hand = _.concat(player.hand, this.deck.getCard(numberOfCards));
};

module.exports = Game;
