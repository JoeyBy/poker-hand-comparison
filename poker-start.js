$(function () 
{
  $('#startDeal').on('click', function () 
  {
    startgame();
    dealCard(deck);
    $('#dealCards').css({'display':'inline-block' })
    $('#startDeal').css({'display':'none' })
  });
  $('#dealCards').on('click', function() 
  {
    playGame();
  });
});

var cardSuit = [ 'S', 'H', 'D', 'C'];
var cardValue = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
var deck = [];
var handOne = [];
var handTwo = [];


function playGame() {
  startgame()
  var gameDeck = deck;

  handOne = dealHand(gameDeck);
  handTwo = dealHand(gameDeck);
  
  var scoredHandOne = scoreHand(handOne, '#handOne', '#handOne-score')
  var scoredHandTwo = scoreHand(handTwo, '#handTwo', '#handTwo-score')

  if (scoredHandOne.score === scoredHandTwo.score) {
    
    //compares higher high cards
    if ((scoredHandOne.score && scoredHandTwo.score) === 1 ) {
      higherHighCard(scoredHandOne.hand, scoredHandTwo.hand)
    } else if ((scoredHandOne.score && scoredHandTwo.score) === 2000 ){
      higherPair(scoredHandOne.hand, scoredHandTwo.hand)
    } else {
      console.log("ERRRR MAHHH GERRRDDDDDD")
    }


  } else if (scoredHandOne.score > scoredHandTwo.score) {
    //player one wins
    console.log("Player One wins")
  } else if (scoredHandTwo.score > scoredHandOne.score) {
    //player two wins!
    console.log("Player two wins")
  } else {
    //something didn't work properly.
    console.log("Something went wrong")
  }

}
function higherPair(handOne, handTwo) {
  if (pairValue(handOne) > pairValue(handTwo)) {
    console.log("Player One Wins!");
  } else if (pairValue(handTwo) > pairValue(handOne)) {
    console.log("Player Two Wins!");
  } 
}

function pairValue(hand) {
  return countDuplicates(hand).getKey(2);
}

//Taken from Benny Neugebauer on Stack overflow (http://stackoverflow.com/questions/9907419/javascript-object-get-key-by-value)
Object.prototype.getKey = function(value){
  for(var key in this){
    if(this[key] == value){
      return key;
    }
  }
  return null;
};


 
function higherHighCard(handOne, handTwo) {
  // compares the highest sorted cards

  if (cardValuesSorted(handOne)[4] > cardValuesSorted(handTwo)[4]) {
    console.log("Player One Wins");
  } else if (cardValuesSorted(handTwo)[4] > cardValuesSorted(handOne)[4]) {
    console.log("Player Two Wins");
  } else {
    //if the highest card is the same, compare the second highest
    if (cardValuesSorted(handOne)[3] > cardValuesSorted(handTwo)[3]) {
      console.log("PLayer One Wins - second high card");
    } else if (cardValuesSorted(handTwo)[3] > cardValuesSorted(handOne)[3]) {
      console.log("Player Two Wins - second high card");
    } else {
      //if the highest card is the same, compare the third highest
      if (cardValuesSorted(handOne)[2] > cardValuesSorted(handTwo)[2]) {
        console.log("PLayer One Wins - third high card");
      } else if (cardValuesSorted(handTwo)[2] > cardValuesSorted(handOne)[2]) {
        console.log("Player Two Wins - third high card");
      } else {     
        //if the highest card is the same, compare the fourth highest
        if (cardValuesSorted(handOne)[1] > cardValuesSorted(handTwo)[1]) {
          console.log("PLayer One Wins - fourth high card");
        } else if (cardValuesSorted(handTwo)[1] > cardValuesSorted(handOne)[1]) {
          console.log("Player Two Wins - fourth high card");
        } else {
          //if the highest card is the same, compare the fifth highest
          if (cardValuesSorted(handOne)[0] > cardValuesSorted(handTwo)[0]) {
            console.log("PLayer One Wins - fourth high card");
          } else if (cardValuesSorted(handTwo)[0] > cardValuesSorted(handOne)[0]) {
            console.log("Player Two Wins - fourth high card");
          } else {
            console.log("HOLY SHIT!!!");
          };
        };
      };
    };
  }
};


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
      if (faceValue == "T") {
        return faceValue = 10;
      } else if (faceValue == "J") {
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
function pairValues(sortedArray)
{

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

function scoreHand(hand, handID, scoreID) 
{
  var score = 0;
  var scoreDisplay = document.querySelector(scoreID);
  showCards(hand, handID);

  if (checkRoyalFlush(hand)) {
    //Ten thousand points
    score = 10000;
    scoreDisplay.innerHTML = "Royal Flush";
  } else if (checkStraightFlush(hand)) {
    // nine thousand
    score = 9000;
    scoreDisplay.innerHTML = "Straight Flush";
  } else if (checkFourKind(hand)) {
    // eight thousand
    score = 8000;
    scoreDisplay.innerHTML = "Four of a Kind";
  } else if (checkFullHouse(hand)) {
    //Seven thousand
    score = 7000;
    scoreDisplay.innerHTML = "Full House";
  } else if (checkFlush(hand)) {
    //Six thousand
    score = 6000;
    scoreDisplay.innerHTML = "Flush";
  } else if (checkStraight(hand)) {
    //Five thousand
    score = 5000;
    scoreDisplay.innerHTML = "Straight";
  } else if (checkThreeKind(hand)) {
    //Four thousand
    score = 4000;
    scoreDisplay.innerHTML = "Three of a Kind";
  } else if (checkTwoPair(hand)) {
    //Three thousand
    score = 3000;
    scoreDisplay.innerHTML = "Two Pair";
  } else if (checkPair(hand)) {
    //Two  thousand
    score = 2000;
    scoreDisplay.innerHTML = "One Pair";
  } else {
    //one point, high card
    score = 1;
    scoreDisplay.innerHTML = "High Card";
  }

  return {
    score: score,
    hand: hand
  }
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
  var vals = countKeys(keyObject)

  if (vals.indexOf(2) == -1) 
  {
    return false;
  } else {
    return true;
  }
}
function countKeys(keyObject) {
  var vals = Object.keys(keyObject).map(function (key) 
  {
    return keyObject[key];
  })
  
  return vals;
}

function checkTwoPair(hand) 
{
  var keyObject = countDuplicates(hand);
  var pairIndex;
  var vals = countKeys(keyObject)

  pairIndex = vals.indexOf(2)
  vals.splice(pairIndex, 1)

  if (vals.indexOf(2) == -1) 
  {
    return false;
  } else {
    return true;
  }
}

