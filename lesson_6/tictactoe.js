const readline = require('readline-sync');

function displayBoard(board){
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
    board[i] = ' ';
  }

  console.log(board);

  return board;
}

function playerChoosesSquare(board){
  console.log('input your choice');
  let playerChoice = readline.question();
  console.log(playerChoice);
}

let board = initializeBoard();
displayBoard(board);
playerChoosesSquare(board);
