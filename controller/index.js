const express = require('express');
const router = express.Router();

router.post('/new/shuffle', createDeck);
router.get('/:deck_id', getDeck);
router.get('/all/decks', getDecks);
router.post('/:deck_id/shuffle/', shuffleDeck);
router.get('/:deck_id/draw', getCards);
router.get('/hand/show', showHand);

function createDeck(req, res) {
  var deckCount = req.query.deck_count;
  if (deckCount && parseInt(deckCount) > 0) {
    var deckInfo = req.app.get('game').createDeck(parseInt(deckCount));
    res.status(200).send(JSON.stringify(deckInfo));
  } else {
    res.status(400).send(
      errorMessageGenerator('Deck count should be greater than 0'));
  }
}

function getDeck(req, res) {
  var deckId = req.params.deck_id;
  var deck = req.app.get('game').getDeck(deckId);
  if (deck.success) {
    res.status(200).send(JSON.stringify(deck));
  } else {
    res.status(400).send(errorMessageGenerator('Deck not found'));
  }
}

function getDecks(req, res) {
  var decks = req.app.get('game').getDecksPresent();
  if (decks.success) {
    res.status(200).send(JSON.stringify(decks));
  } else {
    res.status(400).send(errorMessageGenerator('No decks present'));
  }
}

function shuffleDeck(req, res) {
  var deckId = req.params.deck_id;
  var shuffledDeck = req.app.get('game').shuffleDeck(deckId);
  if (shuffledDeck.success) {
    res.status(200).send(JSON.stringify(shuffledDeck));
  } else {
    res.status(400).send(errorMessageGenerator('Deck not found'));
  }
}

function getCards(req, res) {
  var count = req.query.count;
  var deckId = req.params.deck_id;
  if (count && parseInt(count) > 0) {
    var cards = req.app.get('game').getCards(count, deckId);
    if (cards.success) {
      res.status(200).send(JSON.stringify(cards));
    } else {
      res.status(400).send(errorMessageGenerator('Deck not found'));
    }
  }
}

function showHand(req, res) {
  res.status(200).send(req.app.get('game').printHand());
}

function errorMessageGenerator(message, statusCode) {
  var message = {
    message: message,
    statusCode: statusCode
  };
  return JSON.stringify(message);
}

module.exports = router;
