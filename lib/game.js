const Deck = require('./deck.js');
const _ = require('lodash');
const cards = require('./cards.js');

var Hand = function () {
  return new Array();
};

var Player = function () {
  this.hand = new Hand();
};

function sortHand(hand) {
  const faceCardsMap = cards.FaceCardsMap;
  var sortedKeys =  Object.keys(hand).sort(function (a, b) {
      if (hand[a].value < hand[b].value) {
        return 1;
      } else if (hand[a].value == hand[b].value) {
        if (faceCardsMap[a] && !faceCardsMap[b]) {
          return -1;
        }

        if (faceCardsMap[b] && !faceCardsMap[a]) {
          return 1;
        }

        if (faceCardsMap[a] && faceCardsMap[b])  {
          const indexOfCardA = _.indexOf(Object.keys(faceCardsMap), a);
          const indexOfCardB = _.indexOf(Object.keys(faceCardsMap), b);
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

  var resultMap = new Map();
  sortedKeys.forEach(function (card) {
      resultMap.set(card, hand[card].count);
    });

  return resultMap;
};

var Game = function () {
  this.player = new Player();
  this.decks = new Array();
};

Game.prototype.createDeck = function (numberOfDecks) {
  var newDeck = new Deck(numberOfDecks);
  this.decks.push(newDeck);
  var returnObject = {
    success: true,
    deck_id: newDeck.id,
    shuffled: true,
    remaining: newDeck.cards_present.length,
  };

  return returnObject;
};

Game.prototype.findDeck = function (deckId) {
  return _.find(this.decks,
    function (deck) { return deck.id === deckId; });
};

Game.prototype.getDeck = function (deckId) {
  var deck = this.findDeck(deckId);
  if (deck) {
    return {
      success: true,
      cards: deck.cards_present,
      deck_id: deck.id,
      remaining: deck.cards_present.length
    };
  } else {
    return {
      success: false
    };
  }
};

Game.prototype.getDecksPresent = function () {
  if (this.decks.length > 0) {
    return {
      success: true,
      decks: this.decks.map(function (deck) {return {
          deck_id: deck.id,
          cards_present: deck.cards_present.length
        };
      })
    };
  } else {
    return {
      success: false
    };
  }
};

Game.prototype.shuffleDeck = function (deckId) {
  var deck = this.findDeck(deckId);
  if (deck) {
    deck.shuffle();
    return {
      success: true,
      cards: deck.cards_present,
      deck_id: deck.id,
      remaining: deck.cards_present.length
    };
  } else {
    return {
      success: false
    };
  }
};

Game.prototype.printHand = function () {
  var hand = this.player.hand;
  var valueOfHand = 0;
  var outputJson = '';
  if (this.player.hand.length === 0) {
    outputJson = '{valueOfHand: ' + valueOfHand + '}';
    return outputJson;
  }

  hand.map(function (card) {
    valueOfHand += card.value;
  });

  var handPrint = _.reduce(hand, function (acc, card) {
    if (!acc[card.card]) {
      acc[card.card] = card;
      acc[card.card].count = 1;
    } else {
      acc[card.card].count = acc[card.card].count + 1;
    }

    return acc;
  }, {});

  var resultMap = sortHand(handPrint);
  outputJson = '{';
  for (var key of resultMap.keys()) {
    outputJson += key + ':' + resultMap.get(key);
    outputJson += ', ';
  }

  outputJson += 'valueOfHand: ' + valueOfHand;
  outputJson = outputJson + '}';
  if (resultMap.keys().length === 0) {
    outputJson = '{}';
  }

  return outputJson;
};

Game.prototype.getCards = function (numberOfCards, deckId) {
  var deck = this.findDeck(deckId);
  if (deck) {
    var cardsTaken = deck.getCard(numberOfCards);
    this.player.hand = _.concat(this.player.hand, cardsTaken);
    return {
      success: true,
      cards: cardsTaken,
      deck_id: deck.id,
      remaining: deck.cards_present.length
    };
  } else {
    return {
      success: false
    };
  }
};

Game.prototype.clearHand = function () {
  this.player.hand = new Hand();
  return this.printHand();
};

module.exports = Game;
