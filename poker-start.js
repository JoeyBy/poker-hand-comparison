var cardSuit = [ 'S', 'H', 'D', 'C'];
var cardValue = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
var deck = []

function newDeck(cardSuit, cardValue) {
// creates a new deck with suit and value pairs. pushes the pairs to the deck array as they are paired up. 
  for (var i = 0; i < cardSuit.length; i++) {
    var suit = cardSuit[i]
    cardValue.forEach(function (item, index, array) {
      var cardThing = []
      cardThing.push(suit, item)
      deck.push(cardThing.join(''))
    });
  }
  //returns the new deck. 
  return deck;
}

function randomNumber(deck) {
  return Math.floor(Math.random() * (deck.length - 1 + 1)) + 1 
}

function dealHand(deck) {
  var hand = [];

  for (var i = 0; i < 5; i++ ) {
    var cardNumber = randomNumber(deck);
    hand.push(deck[cardNumber])
    deck.splice(deck[cardNumber], 1)
  }
  console.log(deck.length)
  console.log(hand)
  return hand;
}

$(function () {
  dealHand(newDeck(cardSuit, cardValue));
})