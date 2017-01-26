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
  _.map(cardsMap, function (value, card) {
    cards.push(new Card(card, value));
  });

  return cards;
};

var NonFaceCards = function () {
  const cards = new Cards();
  [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function (value) {
    const card = new Card(value.toString(), value);
    cards.push(card);
  });

  return cards;
};

var Card = function (card, value) {
  this.value = value;
  this.card = card;
};

var Cards = function () {
  return new Array();
};

var Deck = function () {
  console.log('Invoked deck creation');
  this.cards_present = this.generateCards();
  this.shuffle();
  this.cards_discarded = new Cards();
  this.id = shortid.generate();
};

Deck.prototype.generateCards = function () {
  return _.concat(new NonFaceCards(), new FaceCards());
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

  _.pullAllWith(this.cards_present, cardsPulled, _.isEqual);
  this.cards_discarded = _.concat(this.cards_discarded, cardsPulled);
  return cardsPulled;
};

module.exports = Deck;
