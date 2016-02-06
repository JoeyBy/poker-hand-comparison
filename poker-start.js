var cardSuit = [ 'S', 'H', 'D', 'C'];
var cardValue = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
var deck = []

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
}
// generate a random number, this is the card out of the deck delt.
function randomNumber(deck) {
  return Math.floor(Math.random() * (deck.length - 1)) + 1 
}

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
}


$(function () {
var gameHand = [];

function startgame() {
  newDeck(cardSuit, cardValue);
}
function showCards(hand) {
  console.log(hand[0], hand[1], hand[2], hand[3], hand[4])
  var cardOne = document.getElementById('dealCardOne')
  var cardTwo = document.getElementById('dealCardTwo')
  var cardThree = document.getElementById('dealCardThree')
  var cardFour = document.getElementById('dealCardFour')
  var cardFive = document.getElementById('dealCardFive')


  cardOne.innerHTML = hand[0]
  cardTwo.innerHTML = hand[1]
  cardThree.innerHTML = hand[2]
  cardFour.innerHTML = hand[3]
  cardFive.innerHTML = hand[4]
}

  $('#startGame').on('click', function () {
    startgame();
  })
  $('#dealCards').on('click', function() {
    gameHand = dealHand(deck);
    showCards(gameHand)


  })

})








