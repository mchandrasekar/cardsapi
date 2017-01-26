const Deck = require('./deck.js');

const newDeck = new Deck();
console.log(newDeck.id);
newDeck.shuffle();
console.log('Cards Pulled');
console.log(require('util').inspect(newDeck.getCard(3), { depth: null }));
console.log('Cards left in Deck');
console.log(require('util').inspect(newDeck.cards_present, { depth: null }));
console.log('Discarded cards');
console.log(require('util').inspect(newDeck.cards_discarded, { depth: null }));
