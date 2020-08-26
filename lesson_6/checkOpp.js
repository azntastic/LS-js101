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
