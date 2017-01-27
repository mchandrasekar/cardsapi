const Deck = require('./deck.js');
const Game = require('./game.js');

const game = new Game(2);
game.addPlayer('John');
console.log('Initial number of cards in the game: ' +
  game.deck.cards_present.length);
console.log('-----John taking 50 cards------');
game.getCards('John', 5);
console.log('----- Johns hand ----');
console.log('Number of cards in Johns hands: ' +
  game.getPlayer('John').show().length);
console.log(require('util').inspect(game.getPlayer('John').show(), { depth: null }));
console.log('Remaining cards in Deck: ' + game.deck.cards_present.length);
console.log('John take two more cards');
game.getCards('John', 2);
console.log('----- Johns hand ----');
console.log('Number of cards in Johns hands: ' +
  game.getPlayer('John').show().length);
console.log(require('util').inspect(game.getPlayer('John').show(), { depth: null }));
console.log('Remaining cards in Deck: ' + game.deck.cards_present.length);
