const _ = require('lodash');

const faceCardsMap = {
  A: 1,
  J: 10,
  Q: 10,
  K: 10,
};
var FaceCards = function () {
  const cards = new Cards();
  ['club', 'diamond', 'heart', 'spade'].forEach(function (suit) {
    _.map(faceCardsMap, function (value, card) {
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

var Cards = function () {
  return new Array();
};

var Card = function (card, value, suit) {
  this.value = value;
  this.card = card;
  this.suit = suit;
};

module.exports.FaceCards = FaceCards;
module.exports.FaceCardsMap = faceCardsMap;
module.exports.NonFaceCards = NonFaceCards;
module.exports.Card = Card;
module.exports.Cards = Cards;
