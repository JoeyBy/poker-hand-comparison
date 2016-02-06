var cardSuit = [ 'S', 'H', 'D', 'C'];
var cardValue = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
var deck = [];
var handOne = [];
var handTwo = [];


function newDeck(cardSuit, cardValue) {
  deck = [];
// creates a new deck with suit and value pairs. pushes the pairs to the deck array as they are paired up. 
  for (var i = 0; i < cardSuit.length; i++) {
    var suit = cardSuit[i]
    cardValue.forEach(function (item, index, array) {
      var cardThing = []
      cardThing.push(suit, item)
      deck.push(cardThing.join(''))
    });
  }
};
// generate a random number, this is the card out of the deck delt.
function randomNumber(deck) {
  return Math.floor(Math.random() * (deck.length - 1)) + 1 
};

function dealHand(deck) {
  var hand = [];
  // pushes 5 elements from the deck array into the hand array. removes the card delt from the deck. 
  for (var i = 0; i < 5; i++ ) {
    var cardNumber = randomNumber(deck);

    hand.push(deck[cardNumber]);
    deck.splice(cardNumber, 1);
  }
  //returns an array
  return hand;
};

function startgame() {
  newDeck(cardSuit, cardValue);
};

function showCards(hand, handID) {
  var cardOne = document.querySelector(handID + ' > .dealCardOne');
  var cardTwo = document.querySelector(handID + ' > .dealCardTwo');
  var cardThree = document.querySelector(handID + ' > .dealCardThree');
  var cardFour = document.querySelector(handID + ' > .dealCardFour');
  var cardFive = document.querySelector(handID + ' > .dealCardFive');

  cardOne.innerHTML = hand[0];
  cardTwo.innerHTML = hand[1];
  cardThree.innerHTML = hand[2];
  cardFour.innerHTML = hand[3];
  cardFive.innerHTML = hand[4];
};

function formatForScoring(hand) {
  var hand = hand;
  var suit = [];
  var cardValue = [];

  for (var i = 0; i < hand.length; i++ ) {


    
  }

  hand.forEach(function (item, index, array) {

  }

  return {
    suits: suit,
    cardValue: cardValue
  }

}

$(function () {
  $('#startDeal').on('click', function () {
    startgame();
    $('#dealCards').css({'display':'inline-block' })
  });
  $('#dealCards').on('click', function() {

    handOne = dealHand(deck);
    handTwo = dealHand(deck);
    showCards(handOne, '#handOne');
    showCards(handTwo, '#handTwo');
  })
//test
});








