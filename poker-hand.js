// poker program that determines the highest value between two poker hands
// provide a way to input the 5 cards in each of the two hands
// analyze and display the winning hand.

// take input.
// value of input
// compare hands

$(document).ready(function(){
  $('#startGame').on('click', getCards);
});

var hand1 = {
  score: 0,
  getCardOne: function(){
    return this.card1 = $('#oneOne').val().toUpperCase();
  },
  getCardTwo: function() {
    return this.card2 = $('#oneTwo').val().toUpperCase();
  },
  getCardThree: function() {
    return this.card3 = $('#oneThree').val().toUpperCase();
  },
  getCardFour: function() {
    return this.card4 = $('#oneFour').val().toUpperCase();
  },
  getCardFive: function() {
    return this.card5 = $('#oneFive').val().toUpperCase();
  },
};

var hand2 = {
  score: 0,
  getCardOne: function(){
    return this.card1 = $('#twoOne').val().toUpperCase();
  },
  getCardTwo: function() {
    return this.card2 = $('#twoTwo').val().toUpperCase();
  },
  getCardThree: function() {
    return this.card3 = $('#twoThree').val().toUpperCase();
  },
  getCardFour: function() {
    return this.card4 = $('#twoFour').val().toUpperCase();
  },
  getCardFive: function() {
    return this.card5 = $('#twoFive').val().toUpperCase();
  },
};

var POKER = {

}

function getCards() {
  // assembles the 5 cards from each hand into a hand
  var handOne = (hand1.getCardOne() + hand1.getCardTwo() + hand1.getCardThree() + hand1.getCardFour() + hand1.getCardFive());
  var handTwo = (hand2.getCardOne() + hand2.getCardTwo() + hand2.getCardThree() + hand2.getCardFour() + hand2.getCardFive());

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
      numbers.push(all[i]);
      // converts T, J, Q, K and A to integers.
        numbers = numbers.map(function(item) {return (item == 'T' ? 10 : item) })
        numbers = numbers.map(function(item) {return (item == 'J' ? 11 : item) })
        numbers = numbers.map(function(item) {return (item == 'Q' ? 12 : item) })
        numbers = numbers.map(function(item) {return (item == 'K' ? 13 : item) })
        numbers = numbers.map(function(item) {return (item == 'A' ? 14 : item) })
      // converts any remaining numbers into integers  
      numbers = numbers.map(Number);
      // sorts the array of integers from lowest to highest
      numbers.sort(compareNumbers);
      all[i+1] && suit.push(all[i+1]);
    };
    // returns an array of arrays of the players hand. [0] is the suit [1] is the face value
    return [suit, numbers]
  };

  var handOneSuit = (cardSort(handOne)[0])
  var handOneValue = (cardSort(handOne)[1])
  var handTwoSuit = (cardSort(handTwo)[0])
  var handTwoValue = (cardSort(handTwo)[1])

  function inArray(array, value) {
    for (var i=0; i<array.length; i++) {
      if(array[i] == value) return true;
    };
    return false;
  }

  // checks to see if a flush is present
  var checkFlush = function(array) {
    for(var i=0; i < array.length - 1; i++) {
      if(array[i] != array[i+1]) {
        return false;
      }
    }
    return true;
  }

  // checks to see if a straight is present
  var checkStraight = function(array) {
    var index = array.indexOf()
    for(var i=0; i<array.length - 1; i++) {
      if (array[i+1] - array[i] != 1) {
        return false;
      }
    }
    return true;
  }
  // checks to see if a flush is preset
  var checkIfRoyalFlush = function(array) {
    if(array[array.length-1] == 14){
      return true;
    } else {
      return false;
    };
  }
  // counts the similar elements in the persons hand (pairs, triples, full house)
  var countMatches = function(array) {
    var counts = {};
    array.forEach(function(x) {counts[x] = (counts[x] || 0)+1; });
    var pairCount = [];
    for (var key in counts) {
      pairCount.push(counts[key])
    }
    return pairCount;
  }

  var checkFourKind = function(array) {
    if (array.indexOf(4) > -1) {
      return true;
    }else{
      return false;
    };
  }

  var checkTriples = function(array) {
    if ($.inArray(3, array) > -1 ){
      return true;
    }else{
      return false;
    };
  }

  var checkPair = function(array) {
    if ($.inArray(2, array) > -1) {
      return true;
    }else{
      return false;
    };
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
    // }else if {
      // return person.score = 200000;
    //one pair
    }else if (checkPair(countMatches(value))) {
      return person.score = 150000;
    // high card
    }else {
      return person.score = 10000;
    };
  }

  // initialize scoring of hand.
  var scoreOne = handScore(hand1, handOneSuit, handOneValue);
  var scoreTwo = handScore(hand2, handTwoSuit, handTwoValue);

  // compare scores and display winner. 
  if (scoreOne > scoreTwo){
    $('#winner').text("Hand One wins!");

  }else if (scoreTwo > scoreOne) {
    $('#winner').text("Hand Two wins!");

  }else {
    $('#winner').text("IT's A TIE!")

  }
};



