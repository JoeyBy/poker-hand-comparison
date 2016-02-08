// new idea:
// store card objects in a hand array. 
// iterate through the card objects for scoring rather than splicing and pushing array items. 


var cardSuit = [ 'S', 'H', 'D', 'C'];
var cardValue = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
var deck = [];
var handOne = [];
var handTwo = [];


function dealCard(deck) {
  var cardNumber = randomNumber(deck)
  //take in one card from the game deck. 
  var cardString = deck[cardNumber];
  //removes the card delt from the deck
  deck.splice(cardNumber, 1);

  // suit and facevale of ONE card returned as object.
  var card = {
    suit: cardString[0],
    faceValue: cardString[1]
  };
  return card;

}


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
    hand.push(dealCard(deck))
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

  cardOne.innerHTML = hand[0].faceValue + hand[0].suit;
  cardTwo.innerHTML = hand[1].faceValue + hand[1].suit;
  cardThree.innerHTML = hand[2].faceValue + hand[2].suit;
  cardFour.innerHTML = hand[3].faceValue + hand[3].suit;
  cardFive.innerHTML = hand[4].faceValue + hand[4].suit;
};

function formatForScoring(hand) {
  var hand = hand;
  var suit = [];
  var cardValue = [];

  for (var i = 0; i < hand.length; i++ ) {



  }

  hand.forEach(function (item, index, array) {

  })

  return {
    suits: suit,
    cardValue: cardValue
  }

}

$(function () {
  $('#startDeal').on('click', function () {
    startgame();
    dealCard(deck);
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








