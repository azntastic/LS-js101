const readline = require('readline-sync');
const CARDS = {
  2: 4,
  3: 4,
  4: 4,
  5: 4,
  6: 4,
  7: 4,
  8: 4,
  9: 4,
  10: 4,
  'J': 4,
  'Q': 4,
  'K': 4,
  'A': 4
};

function prompt(message){
  console.log(`=> ${message}`);
}

function initializeDeck(currentDeck){
	Object.keys(CARDS).forEach(key => {
  	for (let i = 0; i < CARDS[key]; i++) {
    	currentDeck.push(key);
    }
  })
 }

function shuffleDeck(currentDeck){
	for (let index = currentDeck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1));
    [currentDeck[index], currentDeck[otherIndex]] = [currentDeck[otherIndex], currentDeck[index]]; //destructuring
  }
}

function deal(currentDeck, cards){
  cards.push(currentDeck[currentDeck.length - 1]);
  currentDeck.pop();
}

function initialDeal(currentDeck, playerCards, dealerCards){
  for (let i = 0; i < 2; i++) {
    deal(currentDeck, playerCards);
    deal(currentDeck, dealerCards);
  }
}


function logStartingCards(playerCards, dealerCards){
  console.log(`Dealer has a ${dealerCards[1]} and an unknown card`);
  console.log(`You have a ${playerCards[0]} and a ${playerCards[1]}`);
}

function calculateTotal(cards) {
  let aces = [];
  let total = 0;

  for (let i = 0; i < cards.length; i++){
    if (cards[i] === 'A'){
      aces.push(cards[i]);
    } else {
      switch(cards[i]){
        case 'J':
        case 'Q':
        case 'K':
          total += 10;
          break;
        default:
          total += Number(cards[i]);
      }
    }
  }

  for (let i = 0; i < aces.length; i++){
    if (total > 10){
      total += 1;
    } else {
      total += 11;
    }
  }

  return total;

}

function bust(cards){
  let total = calculateTotal(cards);
  return (total > 21);
}

function compareCards(playerCards, dealerCards){
  console.log(`Dealer had: ${dealerCards}`);
  console.log(`You had: ${playerCards}\n`);
  console.log(`Dealer total: ${calculateTotal(dealerCards)}, Your total: ${calculateTotal(playerCards)}`);
}

function hitOrStay(){
  let acceptable = ['hit', 'stay'];
  let answer;

  while (true){
    prompt(`hit or stay`);
    answer = readline.question();
    if (acceptable.includes(answer)) break;
    prompt('invalid response.');
  }

  return answer;
}

function playerTurn(currentDeck, playerCards, dealerCards, status){
  while(true){
    if (hitOrStay() === 'stay') break;
    deal(currentDeck, playerCards);
    console.clear();
    console.log(`Dealer has a ${dealerCards[1]} and an unknown card`);
    console.log(`Your cards: ${playerCards}`);
    if (bust(playerCards)) {
      status.player = 'bust';
      break;
    }
  }
}

function dealerTurn(currentDeck, dealerCards, status){
  while(true){
    if (calculateTotal(dealerCards) >= 17 || bust(dealerCards)) break;
    deal(currentDeck, dealerCards);
  }

  if (bust(dealerCards)) {
    console.log('dealer bust');
    status.dealer = 'bust';
  }
}

function displayWinner(playerCards, dealerCards, status){
  if (status.player === 'bust'){
    prompt('You bust - dealer wins!\n');
  } else if (status.dealer === 'bust'){
    prompt('Dealer bust - you win!\n');
  } else {
    let playerTotal = calculateTotal(playerCards);
    let dealerTotal = calculateTotal(dealerCards);

    if (playerTotal > dealerTotal) {
      prompt('You win!\n');
    } else {
      prompt('Dealer wins!\n');
    }
  }
}

function playAgain() {
  let answer;
  let acceptable = ['y', 'n'];

  while (true) {
    prompt('Play again? (y or n)');
    answer = readline.question().toLowerCase();
    if (acceptable.includes(answer)) break;
    prompt('invalid response.');
  }


  return (answer === 'y');
}

console.clear();
prompt('Welcome to TwentyOne');

while(true){
  let currentDeck = [];
  let dealerCards = [];
  let playerCards = [];
  let status = {
    player: 'active',
    dealer: 'active'
  }

  initializeDeck(currentDeck);
  shuffleDeck(currentDeck);
  initialDeal(currentDeck, playerCards, dealerCards);
  logStartingCards(playerCards, dealerCards);
  playerTurn(currentDeck, playerCards, dealerCards, status);
  if (status.player !== 'bust'){
    dealerTurn(currentDeck, dealerCards, status);
  }
  console.clear();
  compareCards(playerCards, dealerCards);
  displayWinner(playerCards, dealerCards, status);
  if (!playAgain()) break;
  console.clear();
}

prompt('Thanks for playing.');
