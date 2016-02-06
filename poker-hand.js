// poker program that determines the highest value between two poker hands
// provide a way to input the 5 cards in each of the two hands
// analyze and display the winning hand.

// take input.
// value of input
// compare hands

$(document).ready(function(){
  $('#startGame').on('click', getCards);
});

function getHand (selector) {
  return $(selector).map(function (index, input) {
    return $(input).val().toUpperCase();
  }).get().join('');
}

// change this variable name to be more unique
var firstHand = {
  score: 0,
  cards: function() {
    return getHand('#handOne-analysis input')
  },
};

var secondHand = {
  score: 0,
  cards: function() {
    return getHand('#handTwo-analysis input')
  },
};

// checks to see if a flush is present
function checkFlush(handSuit) {
  for(var i=0; i < handSuit.length - 1; i++) {
    if(handSuit[i] != handSuit[i+1]) {
      return false;
    }
  }
  return true;
}

// checks to see if a straight is present
function checkStraight(handValue) {
  var index = handValue.indexOf()
  for(var i=0; i < handValue.length - 1; i++) {
    if (handValue[i+1] - handValue[i] != 1) {
      return false;
    }
  }
  return true;
}
// checks to see if a flush is preset
function checkIfRoyalFlush(handValue) {
  if(handValue[handValue.length-1] == 14){
    return true;
  } else {
    return false;
  };
}
// counts the similar elements in the persons hand (pairs, triples, full house)
function countMatches(handValue) {
  var counts = {};
  handValue.forEach(function(x) {counts[x] = (counts[x] || 0)+1; });
  var pairCount = [];
  for (var key in counts) {
    pairCount.push(counts[key])
  }
  return pairCount;
}

function checkFourKind(handValue) {
  if (handValue.indexOf(4) > -1) {
    return true;
  }else{
    return false;
  };
}

function checkTriples(handValue) {
  if ($.inArray(3, handValue) > -1 ){
    return true;
  }else{
    return false;
  };
}

function checkTwoPair(handValue) {
  var pairCount = 0;
  handValue.forEach(function(e) {
    if (e == 2){
      pairCount += 1
    };
  });
  if (pairCount == 2){
    return true
  };
};

function checkPair(handValue) {
  if ($.inArray(2, handValue) > -1) {
    return true;
  }else{
    return false;
  };
}

function higherCard() {
}

function getCards() {
  // sorts the elements of each hand into suits and face values. 
  var cardSort = function(hand) {
    var suit = []
    var numbers =  []
    var all = hand.split('') 
    // this sorts the numbers into numeric order
    function compareNumbers(a,b){
      return a - b;
    };

    for (var i=0; i < hand.length-1; i+= 2) {
      numbers.push(hand[i]);
      // converts T, J, Q, K and A to integers.
        numbers = numbers.map(function(item) {return (item == 'T' ? 10 : item) })
        numbers = numbers.map(function(item) {return (item == 'J' ? 11 : item) })
        numbers = numbers.map(function(item) {return (item == 'Q' ? 12 : item) })
        numbers = numbers.map(function(item) {return (item == 'K' ? 13 : item) })
        numbers = numbers.map(function(item) {return (item == 'A' ? 14 : item) })
        // can use all conversion logic in single map function.
        // can include the .map (Number) logic in the original map function. user parseInt(item) instead.

      // converts any remaining numbers into integers  
      numbers = numbers.map(Number);
      // sorts the array of integers from lowest to highest
      numbers.sort(compareNumbers);
      hand[i+1] && suit.push(hand[i+1]);
    };
    // returns an array of arrays of the players hand. [0] is the suit [1] is the face value
    return [suit, numbers]
  };

  var handOneSuit = (cardSort(firstHand.cards())[0])
  var handOneValue = (cardSort(firstHand.cards())[1])
  var handTwoSuit = (cardSort(secondHand.cards())[0])
  var handTwoValue = (cardSort(secondHand.cards())[1])

  function inArray(array, value) {
    for (var i=0; i<array.length; i++) {
      if(array[i] == value) return true;
    };
    return false;
  }

  //assign score to hands based on hand value.
  var handScore = function(person, suit, value) {
    //royal flush
    if ((checkFlush(suit)) && (checkStraight(value)) && (checkIfRoyalFlush(value))){
      return person.score = 9999999;
    //straight flush
    }else if ((checkFlush(suit)) && (checkStraight(value))){
      return person.score = 700000;
    // four of a kind
    }else if (checkFourKind(countMatches(value))){
      return person.score = 600000;
    //full house
    }else if ((checkTriples(countMatches(value))) && (checkPair(countMatches(value)))) {
      return person.score = 500000;
    // flush
    }else if (checkFlush(suit)){
      return person.score = 400000;
    //straight
    }else if (checkStraight(value)) {
      return person.score = 350000;
    // 3 of a kind
    }else if (checkTriples(countMatches(value))) {
      return person.score = 300000;
    // two pair
    }else if (checkTwoPair(countMatches(value))){
      return person.score = 200000;
    //one pair
    }else if (checkPair(countMatches(value))) {
      return person.score = 150000;
    // high card
    }else {
      return person.score = 10000;
    };
  }

  // initialize scoring of hand.
  var scoreOne = handScore(firstHand, handOneSuit, handOneValue);
  var scoreTwo = handScore(secondHand, handTwoSuit, handTwoValue);

  // compare scores and display winner. 
  if (scoreOne > scoreTwo){
    $('#winner').text("Hand One wins!");

  }else if (scoreTwo > scoreOne) {
    $('#winner').text("Hand Two wins!");

  }else {
    $('#winner').text("IT's A TIE!")

  }

};



