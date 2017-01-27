const shortid = require('shortid');
const _ = require('lodash');

var FaceCards = function () {
  const cardsMap = {
    A: 1,
    K: 10,
    Q: 10,
    J: 10,
  };
  const cards = new Cards();
  ['club', 'diamond', 'heart', 'spade'].forEach(function (suit) {
    _.map(cardsMap, function (value, card) {
      cards.push(new Card(card, value, suit));
    });
  });

  return cards;
};

var NonFaceCards = function () {
  const cards = new Cards();
  ['club', 'diamond', 'heart', 'spade'].forEach(function (suit) {
    [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function (value) {
      const card = new Card(value.toString(), value, suit);
      cards.push(card);
    });
  });

  return cards;
};

var Card = function (card, value, suit) {
  this.value = value;
  this.card = card;
  this.suit = suit;
};

var Cards = function () {
  return new Array();
};

var Deck = function (numberOfDecks) {
  console.log('Invoked deck creation');
  this.numberOfDecks = numberOfDecks || 1;
  this.cards_present = this.generateCards();
  this.shuffle();
  this.cards_taken = new Cards();
  this.id = shortid.generate();
};

Deck.prototype.generateCards = function () {
  var newCards = new Array();
  for (var i = 0; i < this.numberOfDecks; i++) {
    newCards = _.concat(newCards, _.concat(new NonFaceCards(), new FaceCards()));
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
    cardsPulled.push(_.sample(this.cards_present));
  };

  _.pullAll(this.cards_present, cardsPulled);
  this.cards_taken = _.concat(this.cards_taken, cardsPulled);
  return cardsPulled;
};

module.exports = Deck;
