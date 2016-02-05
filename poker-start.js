var cardSuit = [ 'S', 'H', 'D', 'C'];
var cardValue = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];

function newDeck(cardSuit, cardValue) {
  var deck = []

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


function dealCard(deck) {
  var newDeck = [];


}


function dealCards(deck) {
  var deck = deck;
  var hand = []

  for (var i = 0; i < 5; i++) {
    var cardValueRemaining = deck.cardValue
    deck.cardSuit
  }

} 

$(function () {
  newDeck(cardSuit, cardValue);
})