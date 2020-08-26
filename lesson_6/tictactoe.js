const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const GAMES_TO_WIN = 2;
const WINNINGLINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], //rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], //columns
  [1, 5, 9], [3, 5, 7] //diagonals
];
const FIRST_MOVE = 'choose';

function prompt(string) {
  console.log(`=> ${string}`);
}

function joinOr(array, delimiter = ',', word = 'or') {

  let newstring = '';
  for (let i = 0; i < array.length; i++) {

    if (i === array.length - 1) {
      newstring = newstring + array[i];
    } else if (i === array.length - 2) {
      newstring = newstring + array[i] + ' ' + word + ' ';
    } else {
      newstring = newstring + array[i] + delimiter + ' ';
    }
  }

  return newstring;
}


function displayBoard(previousResult, scores, board){
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  if (previousResult) {
    switch(previousResult) {
      case 'tie':
        prompt('It was a tie');
        break;
      default:
        prompt(`${previousResult} won`);
    }
  }

  console.log(`Score: Player ${scores.player}, Computer ${scores.computer}`);
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function initializeBoard(){
  let board = {};

  for (let i = 1; i <= 9; i++) {
    board[i] = INITIAL_MARKER;
  }
  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board){
  let square;

  while(true){
    prompt(`Choose a square (${joinOr(emptySquares(board))})`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;
    prompt('Sorry, invalid choice');
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board){
  let atRiskSquare = null;

  atRiskSquare = checkOpp('attack', board);

  if(!atRiskSquare){
    atRiskSquare = checkOpp('defence', board);
  }

  if(!atRiskSquare){
    if(board[5] === ' '){
      atRiskSquare = 5;
    }
  }

  if (atRiskSquare) {
    board[atRiskSquare] = COMPUTER_MARKER;
  } else {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    board[emptySquares(board)[randomIndex]] = COMPUTER_MARKER;
  }
}

function checkOpp(mode, board) {
  let oppSquare = null;
  let markerToCheck = null;

  if (mode === 'defence') {
    markerToCheck = HUMAN_MARKER;
  } else {
    markerToCheck = COMPUTER_MARKER;
  }

  for (let line = 0; line < WINNINGLINES.length; line ++){
    let toCheck = WINNINGLINES[line];
    if (toCheck.filter(square => board[square] === markerToCheck).length === 2){
       if (toCheck.filter(square => board[square] === INITIAL_MARKER).length === 1){
         oppSquare = toCheck.filter(square => board[square] === INITIAL_MARKER)[0];
         console.log(oppSquare);
         break;
       }
    }
  }

  return oppSquare;
}




function boardFull(board) {
  return (emptySquares(board).length === 0);
}

function hasWinner(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  for (let line = 0; line < WINNINGLINES.length; line++){
    let [sq1, sq2, sq3] = WINNINGLINES[line];

    if (board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
    ){
      return 'player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ){
      return 'computer';
    }
  }

  return null;
}

function playRound(player1, previousResult, scores, board) {
  if (player1 === 'p'){
    while(true){ //Round consisting of moves
      displayBoard(previousResult, scores, board); //extract this logic?
      playerChoosesSquare(board);
      if ( boardFull(board) || hasWinner(board)) break;
      computerChoosesSquare(board);
      if ( boardFull(board) || hasWinner(board)) break;
    }
  } else {
    while(true){ //Round consisting of moves
      displayBoard(previousResult, scores, board); //extract this logic?
      computerChoosesSquare(board);
      displayBoard(previousResult, scores, board);
      if ( boardFull(board) || hasWinner(board)) break;
      playerChoosesSquare(board);
      if ( boardFull(board) || hasWinner(board)) break;
    }
  }
}

function displayRoundWinner(previousResult, board) {
  if (hasWinner(board)) {
    previousResult = detectWinner(board);
    return previousResult;
  } else {
    previousResult = 'tie';
    return previousResult;
  }
}

function playAgain() {
  prompt('Play again? (y or n)');
  let answer = readline.question().toLowerCase()[0];
  if (answer === 'y') return true;
}

function adjustScores(scores, board) {
  scores[detectWinner(board)] ++;
}

while(true) { //Game
  let board = initializeBoard();
  let scores = {
    player: 0,
    computer: 0
  };
  let previousResult = null;
  let player1 = null;

  if (FIRST_MOVE === 'choose') {
    while(true) {
      prompt('choose who to go first: player or computer');
      player1 = readline.question().toLowerCase()[0];
      if (player1 === 'p' || player1 === 'c') break;
    }
  }

  while(true){ //Set
    playRound(player1, previousResult, scores, board);
    adjustScores(scores, board);
    previousResult = displayRoundWinner(previousResult, board);
    displayBoard(previousResult, scores, board);
    if (scores.computer === GAMES_TO_WIN || scores.player === GAMES_TO_WIN) break;
    board = initializeBoard();
  }

  if (!playAgain()) break;
}

prompt('Thanks for playing Tic Tac Toe!');
