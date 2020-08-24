const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const GAMES_TO_WIN = 2;

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


function displayBoard(board){
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

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
  let square;
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  board[emptySquares(board)[randomIndex]] = COMPUTER_MARKER;
}

function boardFull(board) {
  return (emptySquares(board).length === 0);
}

function hasWinner(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  let winningLines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], //rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], //columns
    [1, 5, 9], [3, 5, 7] //diagonals
  ];

  for (let line = 0; line < winningLines.length; line++){
    let [sq1, sq2, sq3] = winningLines[line];

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

function playAnother() {
  prompt('Play again? (y or n)');
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y'){
    return true;
  }
}

// let scores = {
//   player : 0,
//   computer : 0
// };

while(true) {
  let board = initializeBoard();

  while(true){
    displayBoard(board);
    playerChoosesSquare(board);
    if ( boardFull(board) || hasWinner(board)) break;
    computerChoosesSquare(board);
    if ( boardFull(board) || hasWinner(board)) break;
  }

  displayBoard(board);

  if (hasWinner(board)) {
    prompt(`${detectWinner(board)} won!`);
    // scores[detectWinner(board)] += 1;
  } else {
    prompt("It's a tie");
  }

  // console.log(scores);

  // if (scores.computer === GAMES_TO_WIN || scores.player === GAMES_TO_WIN){
  //   if (scores.player === 5) {
  //     console.log('player grand winner');
  //     break;
  //   } else {
  //     console.log('computer grand winner');
  //     break;
  //   }
  // }

  prompt('Play again? (y or n)');
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
}

prompt('Thanks for playing Tic Tac Toe!');

/*
  initializeBoard
  playRound
  checkWinner
  displayWinner
  checkGrandWinner
*/
