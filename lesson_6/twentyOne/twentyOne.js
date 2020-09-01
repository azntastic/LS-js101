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

// function playRound(currentDeck){
//   dealPlayer(currentDeck);
//   dealDealer(currentDeck)
// }
//

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
  console.log(`dealer had ${dealerCards}`);
  console.log(`you had ${playerCards}`);
  console.log(`Dealer total: ${calculateTotal(dealerCards)}, Your total: ${calculateTotal(playerCards)}`);
}

function playerTurn(currentDeck, playerCards, status){
  while(true){
    console.log(`hit or stay`)
    let answer = readline.question();
    if (answer === 'stay') break;
    deal(currentDeck, playerCards);
    console.log(`Your cards: ${playerCards}`); //display cards
    if (bust(playerCards)) {
      console.log('you bust');
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
    console.log('dealer wins');
  } else if (status.dealer === 'bust'){
    console.log('player wins');
  } else {
    let playerTotal = calculateTotal(playerCards);
    let dealerTotal = calculateTotal(dealerCards);

    if (playerTotal > dealerTotal) {
      console.log('player wins!');
    } else {
      console.log('dealer wins!');
    }
  }
}

function playAgain(){
  console.log('Play Again? y/n')
  let playAgain = readline.question()
  if (playAgain === 'y') return true;
}

// Game Logic
console.log('welcome to TwentyOne');

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

  // Game Logic
  logStartingCards(playerCards, dealerCards);
  playerTurn(currentDeck, playerCards, status);
  if (status.player !== 'bust'){
    dealerTurn(currentDeck, dealerCards, status);
  }
  compareCards(playerCards, dealerCards);
  displayWinner(playerCards, dealerCards, status);
  if (!playAgain()) break;
}

  // // Player turn
  // while(true){
  //   console.log(`What do you do?`)
  //   let answer = readline.question();
  //   if (answer === 'stay') break;
  //   deal(currentDeck, playerCards);
  //   console.log(`Your cards: ${playerCards}`); //display cards
  //   if (bust(playerCards)) {
  //     console.log('you bust');
  //     status.player = 'bust';
  //     break;
  //   }
  // }

  // // Dealer turn
  // if (status.player === 'active'){
  //   while(true){
  //     if (calculateTotal(dealerCards) >= 17 || bust(dealerCards)) break;
  //     deal(currentDeck, dealerCards);
  //   }
  //
  //   if (bust(dealerCards)) {
  //     console.log('dealer bust');
  //     status.dealer = 'bust';
  //   }
  // }

  // // Check busts
  // if (status.player === 'bust'){
  //   compareCards(playerCards, dealerCards);
  //   console.log('dealer wins');
  // } else if (status.dealer === 'bust'){
  //   compareCards(playerCards, dealerCards);
  //   console.log('player wins');
  // }
  //
  // // Final calc
  // if (status.player === 'active' && status.dealer ==='active'){
  //   let playerTotal = calculateTotal(playerCards);
  //   let dealerTotal = calculateTotal(dealerCards);
  //
  //   if (playerTotal > dealerTotal) {
  //     console.log('player wins!');
  //   } else {
  //     console.log('dealer wins!');
  //   }
  // }

  // Play Again
//   console.log('Play Again? y/n')
//   let playAgain = readline.question()
//   if (playAgain === 'n') break;
//   console.clear();
// }

  // playRound(currentDeck);
