const shortid = require('shortid');
const _ = require('lodash');
const cards = require('./cards.js');

var Deck = function (numberOfDecks) {
  this.numberOfDecks = numberOfDecks || 1;
  this.cards_present = this.generateCards();
  this.shuffle();
  this.cards_taken = new cards.Cards();
  this.id = shortid.generate();
};

Deck.prototype.generateCards = function () {
  var newCards = new Array();
  for (var i = 0; i < this.numberOfDecks; i++) {
    newCards = _.concat(newCards,
      _.concat(new cards.NonFaceCards(), new cards.FaceCards()));
  };

  return newCards;
};

Deck.prototype.shuffle = function () {
  this.cards_present = _.shuffle(this.cards_present);
};

Deck.prototype.reCreateDeck = function (oldDeck) {
  const newDeck = new Deck();
  newDeck.id = oldDeck.id;
};

Deck.prototype.getCard = function (numberOfCards) {
  const cardsPulled = new Array();
  for (var i = 0; i < numberOfCards; i++) {
    var cardToPull = this.cards_present[this.cards_present.length - 1];
    if (cardToPull) {
      cardsPulled.push(cardToPull);
      _.pull(this.cards_present, cardToPull);
    }
  };

  return cardsPulled;
};

module.exports = Deck;
