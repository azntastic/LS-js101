function checkOpp(mode, board) {
  let oppSquare = null;
  let markerToCheck = COMPUTER_MARKER;

  if (mode = 'defence') {
    markerToCheck = HUMAN_MARKER;
  }

  console.log('here');

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

function printRoundWinner(previousResult){
  if (previousResult) {
    switch(previousResult) {
      case 'tie':
        prompt('It was a tie');
        break;
      default:
        prompt(`${previousResult} won`);
    }
  }
}

function chooseSquare(currentPlayer, board){
  if (currentPlayer === 'player'){
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

function alternatePlayer(currentPlayer){
  if (currentPlayer === 'player'){
    return 'computer';
  } else {
    return 'player';
  }
}

function playRound(playerOne, previousResult, scores, board) {
  let currentPlayer = playerOne;
  displayBoard(scores, board);

  while(true){
    chooseSquare(currentPlayer, board);
    displayBoard(scores, board);
    if ( boardFull(board) || hasWinner(board)) break;
    currentPlayer = alternatePlayer(currentPlayer);
  }
}
