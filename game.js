const Deck = require('./deck.js');
const _ = require('lodash');
const cards = require('./cards.js');

var Hand = function () {
  return new Array();
};

var Player = function (name) {
  this.name = name;
  this.hand = new Hand();
};

Player.prototype.show = function () {
  const faceCardsMap = cards.FaceCardsMap;
  return this.hand.sort(function (a, b) {
    if (a.value < b.value) {
      return 1;
    } else if (a.value == b.value) {
      if (faceCardsMap[a.card] && !faceCardsMap[b.card]) {
        return -1;
      }

      if (faceCardsMap[b.card] && !faceCardsMap[a.card]) {
        return 1;
      }

      if (faceCardsMap[a.card] && faceCardsMap[b.card])  {
        const indexOfCardA = _.indexOf(Object.keys(faceCardsMap), a.card);
        const indexOfCardB = _.indexOf(Object.keys(faceCardsMap), b.card);
        if (indexOfCardA > indexOfCardB) {
          return -1;
        } else {
          return 1;
        }
      }

      return 0;
    } else {
      return -1;
    }
  });
};

var Game = function (numberOfDecks) {
  this.players = new Array();
  this.deck = new Deck(numberOfDecks);
};

Game.prototype.addPlayer = function (name) {
  this.players.push(new Player(name));
};

Game.prototype.getPlayer = function (name) {
  return _.find(this.players,
    function (player) { return player.name === name; });
};

Game.prototype.getCards = function (playerName, numberOfCards) {
  const player = this.getPlayer(playerName);
  player.hand = _.concat(player.hand, this.deck.getCard(numberOfCards));
};

module.exports = Game;
