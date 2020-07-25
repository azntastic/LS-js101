const readline = require('readline-sync');
const MESSAGES = require('./rpsls-messages.json');

const VALID_CHOICES = {
  rock:     ['rock', 'r'],
  paper:    ['paper', 'p'],
  scissors: ['scissors', 'sc'],
  lizard:   ['lizard', 'l'],
  spock:    ['spock', 'sp']
};
const WINNING_CONDITIONS = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock',     'spock'],
  scissors: ['paper',    'lizard'],
  lizard:   ['paper',    'spock'],
  spock:    ['rock',     'scissors']
};

let scores = {
  player: 0,
  computer: 0
};

let winner;
let grandWinner;


function prompt(message) {
  console.log(`=> ${message}`);
}

function displayInstructions() {
  prompt(MESSAGES['instructions']);
}

function playerWins(choice, computerChoice) {
  return WINNING_CONDITIONS[choice].includes(computerChoice);
}

function computerWins(choice, computerChoice) {
  return WINNING_CONDITIONS[computerChoice].includes(choice);
}

function findValidChoice(choice) {
  return Object.keys(VALID_CHOICES).find(key => VALID_CHOICES[key].includes(choice));
}

function checkChoice(choice) {
  let validArr = Object.values(VALID_CHOICES).flat();
  if (validArr.includes(choice)) {
    return true;
  }
}

function getPlayerChoice() {
  console.log(`${MESSAGES["displayChoices"]}`, Object.keys(VALID_CHOICES).join(', '));
  let choice = readline.question().toLowerCase();

  while (!checkChoice(choice)) {
    prompt(MESSAGES["invalidChoice"]);
    choice = readline.question().toLowerCase();
  }

  return findValidChoice(choice);
}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * Object.keys(VALID_CHOICES).length);
  return Object.keys(VALID_CHOICES)[randomIndex];
}

function displayChoices(playerChoice, computerChoice) {
  console.log(`=> ${MESSAGES["displaySelections"]}`, playerChoice, computerChoice);
}

function checkWinner(playerChoice, computerChoice) {
  if (playerWins(playerChoice, computerChoice)) {
    winner = 'player';
  } else if (computerWins(playerChoice, computerChoice)) {
    winner = 'computer';
  } else {
    winner = null;
  }
}

function displayWinner() {
  if (winner) {
    console.log(`=> ${MESSAGES["displayWinner"]}`, winner);
  } else {
    prompt(MESSAGES["displayTie"]);
  }
}

function updateScores() {
  if (winner) scores[winner]++;
}

function displayScores(){
  console.log(`=> ${MESSAGES["displayScores"]}`, scores.player, scores.computer);
}

function checkGrandWinner() {
  if (scores.player === 5 || scores.computer === 5) {
    return true;
  }
}

function updateGrandWinner() {
  if (checkGrandWinner()) {
    if (scores.player === 5) {
      grandWinner = 'player';
    } else {
      grandWinner = 'computer';
    }
  }
}

function resetScores() {
  grandWinner = null;
  scores.player = 0;
  scores.computer = 0;
}

function displayGrandWinner(){
  console.log(`=> ${MESSAGES["displayGrandWinner"]}`, grandWinner);
}

function checkPlayAnother(runAnother){
  if (runAnother === 'y' || runAnother === 'n') return true;
}

function getPlayAnother(){
  prompt(MESSAGES["anotherGame"]);
  let runAnother = readline.question().toLowerCase();

  while (!checkPlayAnother(runAnother)) {
    prompt(MESSAGES["yesOrNo"]);
    runAnother = readline.question().toLowerCase();
  }

  if (runAnother[0] === 'y') return true;
}

displayInstructions()
while (true) {

  let playerChoice = getPlayerChoice();
  let computerChoice = getComputerChoice();

  displayChoices(playerChoice, computerChoice);
  checkWinner(playerChoice, computerChoice);
  displayWinner();
  updateScores();
  displayScores();
  updateGrandWinner();

  if (grandWinner) {
    displayGrandWinner();
    if (!getPlayAnother()) {
      break;
    } else {
      resetScores();
      console.clear();
    }
  }
}
