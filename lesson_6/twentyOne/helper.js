function calculateTotal(cards) {

  let aces = [];
  let total;

  for (let i = 0; i < cards.length; i++){
    if (cards[i] === 'A'){
      aces.push(cards[i]);
    } else {
      switch(card[i]){
        case 'J':
        case 'Q':
        case 'K':
          total += 10;
          break;
        default:
          total += Number(card[i]);
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

// let total = cards.reduce((acc, card) => {
//   switch(card){
//     case 'J':
//     case 'Q':
//     case 'K':
//       acc = acc + 10;
//       break;
//     case 'A':
//       if (acc > 10) {
//       acc = acc + 1;
//       } else {
//       acc = acc + 11;
//       }
//       break;
//     default:
//       acc = acc + Number(card);
//   }
//   return acc;
// }, 0);
//
// return total;
