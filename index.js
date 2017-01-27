const Deck = require('./deck.js');

const newDeck = new Deck(2);
console.log(newDeck.id);
newDeck.shuffle();
console.log('Initital number of cards');
console.log(require('util').inspect(newDeck.cards_present.length, { depth: null }));
console.log('Cards Pulled');
console.log(require('util').inspect(newDeck.getCard(6), { depth: null }));
console.log('Cards left in Deck');
console.log(require('util').inspect(newDeck.cards_present.length, { depth: null }));
console.log('Discarded cards');
console.log(require('util').inspect(newDeck.cards_discarded.length, { depth: null }));
