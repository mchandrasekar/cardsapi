const Deck = require('./deck.js');
const Game = require('./game.js');

const game = new Game(1, 1);
game.addPlayer('John');
console.log(require('util').inspect(game.getPlayer('John').hand.length, { depth: null }));
game.getCards('John', 2);
console.log(require('util').inspect(game.getPlayer('John').hand.length, { depth: null }));
console.log(require('util').inspect(game.deck.cards_present.length, { depth: null }));
console.log('----------');
console.log(require('util').inspect(game.deck.cards_taken.length, { depth: null }));
game.getCards('John', 4);
console.log(require('util').inspect(game.getPlayer('John').hand.length, { depth: null }));
console.log(require('util').inspect(game.deck.cards_present.length, { depth: null }));

// console.log(newDeck.id);
// newDeck.shuffle();
// console.log('Initital number of cards');
// console.log(require('util').inspect(newDeck.cards_present.length, { depth: null }));
// console.log('Cards Pulled');
// console.log(require('util').inspect(newDeck.getCard(6), { depth: null }));
// console.log('Cards left in Deck');
// console.log(require('util').inspect(newDeck.cards_present.length, { depth: null }));
// console.log('Discarded cards');
// console.log(require('util').inspect(newDeck.cards_taken.length, { depth: null }));
