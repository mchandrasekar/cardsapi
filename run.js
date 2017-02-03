
const prompt = require('syncprompt');
var request = require('request');
var Promise = require('promise');

playGame();

function playGame() {
  console.log('Select round option');
  console.log('1. Create Deck');
  console.log('2. Show all decks');
  console.log('3. Get cards');
  console.log('4. Show Hand');
  console.log('5. Show deck');
  console.log('6. Reshuffle deck');
  console.log('7. Clear hand');

  console.log('10. exit');
  var option = prompt();
  if (option == 10) {
    console.log('exit');
    process.exit(0);
  }

  if (option == 1) {
    var numberOfDecks = prompt('Enter number of decks: ');
    createDeck(numberOfDecks);
  } else if (option == 2) {
    showAllDecks();
  } else if (option == 3) {
    var deckId = prompt('Enter deck id: ');
    var numberOfCards = prompt('Enter number of cards to take: ');
    getCards(numberOfCards, deckId);
  } else if (option == 4) {
    showHand();
  } else if (option == 5) {
    var deckId = prompt('Enter deck id: ');
    showDeck(deckId);
  } else if (option == 6) {
    var deckId = prompt('Enter deck id: ');
    reshuffleDeck(deckId);
  } else if (option == 7) {
    clearHand();
  }
}

function createDeck(numberOfDecks) {
  var requestOptions = {
    method: 'POST',
    uri: 'http://localhost:3000/api/deck/new/shuffle',
    qs: { deck_count: numberOfDecks }
  };
  return makeRequestAndContinue(requestOptions);
}

function showAllDecks() {
  var requestOptions = {
    method: 'GET',
    uri: 'http://localhost:3000/api/deck/all/decks'
  };
  return makeRequestAndContinue(requestOptions);
}

function getCards(numberOfCards, deckId) {
  var requestOptions = {
    method: 'GET',
    uri: 'http://localhost:3000/api/deck/' + deckId + '/draw',
    qs: { count: numberOfCards }
  };
  return makeRequestAndContinue(requestOptions);
}

function showHand() {
  var requestOptions = {
    method: 'GET',
    uri: 'http://localhost:3000/api/deck/hand/show'
  };
  return makeRequestAndContinue(requestOptions);
}

function clearHand() {
  var requestOptions = {
    method: 'POST',
    uri: 'http://localhost:3000/api/deck/hand/clear'
  };
  makeRequestAndContinue(requestOptions);
}

function showDeck(deckId) {
  var requestOptions = {
    method: 'GET',
    uri: 'http://localhost:3000/api/deck/' + deckId
  };
  makeRequestAndContinue(requestOptions);
}

function reshuffleDeck(deckId) {
  var requestOptions = {
    method: 'POST',
    uri: 'http://localhost:3000/api/deck/' + deckId + '/shuffle'
  };
  makeRequestAndContinue(requestOptions);
}

function makeRequestAndContinue(requestOptions) {
  return makeRequest(requestOptions).
    then(function (result) {
      console.log(result);
      playGame();
    }).
    catch(function (error) {
      console.log(error);
      playGame();
    });
}

function makeRequest(requestParams) {
  return new Promise(function (resolve, reject) {
    request(requestParams, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(body);
      }
    });
  });
}
