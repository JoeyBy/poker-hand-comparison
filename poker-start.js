$(function () 
{
  $('#startDeal').on('click', function () 
  {
    startgame();
    dealCard(deck);
    $('#dealCards').css({'display':'inline-block' })
  });
  $('#dealCards').on('click', function() 
  {
    handOne = dealHand(deck);
    handTwo = dealHand(deck);
    scoreHand(handOne)
    scoreHand(handTwo)
    showCards(handOne, '#handOne');
    showCards(handTwo, '#handTwo');
    
  });
});

var cardSuit = [ 'S', 'H', 'D', 'C'];
var cardValue = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ];
var deck = [];
var handOne = [];
var handTwo = [];

function startgame() 
{
  newDeck(cardSuit, cardValue);
};

//Test Hands
// var testFlush = [ {suit: 'H', faceValue: '2'}, {suit: 'H', faceValue: '5'}, {suit: 'H', faceValue: '10'}, {suit: 'H', faceValue: 'A'}, {suit: 'H', faceValue: 'Q'}]
// var testNotFlush =  [ {suit: 'H', faceValue: '2'}, {suit: 'H', faceValue: '5'}, {suit: 'H', faceValue: '10'}, {suit: 'H', faceValue: 'A'}, {suit: 'C', faceValue: 'Q'}]
// var testStraight = [ {suit: 'H', faceValue: 'J'}, {suit: 'H', faceValue: 'K'}, {suit: 'D', faceValue: '10'}, {suit: 'H', faceValue: 'A'}, {suit: 'C', faceValue: 'Q'}]
// var testNotStraight = [ {suit: 'H', faceValue: '7'}, {suit: 'D', faceValue: '5'}, {suit: 'H', faceValue: '10'}, {suit: 'H', faceValue: 'T'}, {suit: 'C', faceValue: '10'}]
// var testFourKind = [ {suit: 'H', faceValue: 'J'}, {suit: 'D', faceValue: '4'}, {suit: 'S', faceValue: '4'}, {suit: 'H', faceValue: '4'}, {suit: 'C', faceValue: '4'}]
// var testNotFourKind = [ {suit: 'H', faceValue: '2'}, {suit: 'C', faceValue: 'K'}, {suit: 'D', faceValue: '10'}, {suit: 'H', faceValue: 'A'}, {suit: 'C', faceValue: 'Q'}]
// var testThreeKind = [ {suit: 'H', faceValue: 'J'}, {suit: 'C', faceValue: 'J'}, {suit: 'D', faceValue: 'J'}, {suit: 'H', faceValue: '6'}, {suit: 'C', faceValue: '2'}]
// var testFullHouse = [ {suit: 'H', faceValue: 'K'}, {suit: 'C', faceValue: 'K'}, {suit: 'D', faceValue: 'Q'}, {suit: 'H', faceValue: 'Q'}, {suit: 'C', faceValue: 'Q'}]
// var testRoyalFlush = [ {suit: 'C', faceValue: '10'}, {suit: 'C', faceValue: 'K'}, {suit: 'C', faceValue: 'J'}, {suit: 'C', faceValue: 'A'}, {suit: 'C', faceValue: 'Q'}]
// var testStraightFlush = [ {suit: 'C', faceValue: '7'}, {suit: 'C', faceValue: '4'}, {suit: 'C', faceValue: '5'}, {suit: 'C', faceValue: '6'}, {suit: 'C', faceValue: '8'}]
// var testTwoPair = [ {suit: 'C', faceValue: '7'}, {suit: 'H', faceValue: '7'}, {suit: 'C', faceValue: '5'}, {suit: 'H', faceValue: '5'}, {suit: 'D', faceValue: 'K'}]



function dealCard(deck) 
{
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
};

function newDeck(cardSuit, cardValue) 
{
  deck = [];
// creates a new deck with suit and value pairs. pushes the pairs to the deck array as they are paired up. 
  for (var i = 0; i < cardSuit.length; i++) 
  {
    var suit = cardSuit[i]
    cardValue.forEach(function (item, index, array) 
    {
      var cardThing = []
      cardThing.push(suit, item)
      deck.push(cardThing.join(''))
    });
  }
};

// generate a random number, this is the card out of the deck delt.
function randomNumber(deck) 
{
  return Math.floor(Math.random() * (deck.length - 1)) + 1 
};

function dealHand(deck) 
{
  var hand = [];
  // pushes 5 elements from the deck array into the hand array. removes the card delt from the deck. 
  for (var i = 0; i < 5; i++ ) 
  {
    hand.push(dealCard(deck))
  }
  //returns an array
  return hand;
};
function sortNumbers(a,b) 
{
  return a - b;
};

function extractCardValues(hand) 
{
  var faceValueArray = [];
  for (var i = 0; i < hand.length; i++) 
  {
    faceValueArray.push(hand[i].faceValue)
  }
  return faceValueArray;
};

function faceCardstoIntegers(cardValueArray) 
{
  var integerArray = cardValueArray.map(function(faceValue) 
  {
      if (faceValue == "J") {
        return faceValue = 11;
      } else if (faceValue == "Q") {
        return faceValue = 12;
      } else if (faceValue == "K") {
        return faceValue = 13;
      } else if (faceValue == "A") {
        return faceValue = 14;
      } else {
        return parseInt(faceValue);
      }
    })
  return integerArray;
}

function cardValuesSorted(hand)
{
  return faceCardstoIntegers(extractCardValues(hand)).sort(sortNumbers)
}

function countDuplicates(hand)
{
  //returns the number of duplicate cards. 
  var counts = {}
  cardValuesSorted(hand).forEach(function(s) {counts[s] = (counts[s] || 0) + 1 });
  return counts;
}


function showCards(hand, handID) 
{
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

function scoreHand(hand) 
{
  var score = 0;

  if (checkRoyalFlush(hand)) {
    //Ten thousand points
    score = 10000;
  } else if (checkStraightFlush(hand)) {
    // nine thousand
    score = 9000;
  } else if (checkFourKind(hand)) {
    // eight thousand
    score = 8000;
  } else if (checkFullHouse(hand)) {
    //Seven thousand
    score = 7000;
  } else if (checkFlush(hand)) {
    //Six thousand
    score = 6000;
  } else if (checkStraight(hand)) {
    //Five thousand
    score = 5000;
  } else if (checkThreeKind(hand)) {
    //Four thousand
    score = 4000;
  } else if (checkTwoPair(hand)) {
    //Three thousand
    score = 3000;
  } else if (checkPair(hand)) {
    //Two  thousand
    score = 2000;
  } else {
    //one point, high card
    score = 1;
  }
  console.log(score)
  return score;
}



//POKER HANDS
  //S + F  +  A //Royal Flush - five cards in sequence all the same suit A to T
  //S + F  //Straight Flush - five cards in sequence all the same suit. not A to T
  //4 of a kind - ...really?
  //Full House - triple and a pair
  //Flush - five cards the same suit
  //straight - five cards in sequence not the same suit.
  //3 of a kind.
  //2 pair
  //1 pair
  //high card - the highest face value of one 5 card. If tied, the second highest is compared, etc. 


function checkRoyalFlush(hand)
{
  if (checkFlush(hand) && checkStraight(hand) && containsAce(hand))
  {
    return true;
  } else {
    return false;
  }
}
//checks if a hand has both a straight and a flush. 
function checkStraightFlush(hand) 
{
  if (checkFlush(hand) && checkStraight(hand))
  {
    return true;
  } else {
    return false;
  }
}
// checks if the hand is a flush
function checkFlush(hand) 
{
  for (var i = 0; i < 4; i++) 
  {
    //if the first suit does not equal the next cards suit the loop breaks and return false. 
    if (hand[i].suit != hand[i+1].suit)
    {
      return false;
    }
  }
  //if the loop does not fail the hand is a flush explicitly returning true. 
  return true;
};
function checkFullHouse(hand)
{
  if (checkThreeKind(hand) && checkPair(hand))
  {
    return true;
  } else {
    return false;
  }
};
function containsAce(hand)
{
  if (cardValuesSorted(hand)[4] == 14) 
  {
    return true;
  } else {
    return false;
  }
};
function checkStraight(hand) 
{
  // this formattedArray variable is the faceCard value's converted to Integers and sorted with the lowest number first in an Array.
  var formattedArray = cardValuesSorted(hand);
  for (var i = 0; i < 4; i++) 
  {
    //if the n+1 card less the n card does not equal 1 then the loop breaks. Not a staight
    if (formattedArray[i+1] - formattedArray[i] != 1)
    {
      return false;
    }
  };
  //if the n+1 card less the n card does equal 1 explicitly returns true. Is a straight.
  return true;
};
function checkFourKind(hand)
{
  var keyObject = countDuplicates(hand);
  var duplicateKeys = Object.keys(keyObject);

  for (var i = 0; i < duplicateKeys.length; i++)
  {
    if (keyObject[duplicateKeys[i]] != 4 ) {
      return false;
    } else {
      return true;
    }
  };
};
function checkThreeKind(hand) 
{
  var keyObject = countDuplicates(hand);
  var vals =[];

  var vals = Object.keys(keyObject).map(function (key) 
  {
    return keyObject[key];
  })
  if (vals.indexOf(3) == -1) 
  {
    return false;
  } else {
    return true;
  }
};
function checkPair(hand)
{
  var keyObject = countDuplicates(hand);
  var vals =[];

  var vals = Object.keys(keyObject).map(function (key) 
  {
    return keyObject[key];
  })
  if (vals.indexOf(2) == -1) 
  {
    return false;
  } else {
    return true;
  }
}
function checkTwoPair(hand) 
{
  var keyObject = countDuplicates(hand);
  var vals =[];
  var pairIndex;

  var vals = Object.keys(keyObject).map(function (key) 
  {
    return keyObject[key];
  })

  pairIndex = vals.indexOf(2)
  vals.splice(pairIndex, 1)

  if (vals.indexOf(2) == -1) 
  {
    return false;
  } else {
    return true;
  }
}

