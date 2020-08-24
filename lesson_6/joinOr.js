// function joinOr(array, delimiter = ',', final = 'or') {
//   return array.reduce((acc, item) => {
//
//     return acc + delimiter + item;
//   });
// }

function joinOr(array, delimiter = ',', final = 'or') {

  let newstring = '';

  for (let i = 0; i < array.length; i++) {

    if (i === array.length - 1) {
      newstring = newstring + array[i];
    } else if (i === array.length - 2) {
      newstring = newstring + array[i] + ' ' + final + ' ';
    } else {
      newstring = newstring + array[i] + delimiter + ' ';
    }
  }

  return newstring;
}



console.log(joinOr([1, 3, 5, 7, 9, 11]));
console.log(joinOr([1, 3, 5, 7, 9, 11], ';'));
console.log(joinOr([1, 3, 5, 7, 9, 11], '*', 'and'));
console.log(joinOr([1, 3], ';'));

// Their solution
/*
function joinOr(arr, delimiter = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
    default:
      return arr.slice(0, arr.length - 1).join(delimiter) +
             `${delimiter}${word} ${arr[arr.length - 1]}`;
  }
}
*/
