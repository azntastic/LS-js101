let words = ['go', 'ahead', 'and', 'jump'];

console.log(words.sort((a, b) => a.length - b.length));

//


function addOne(x) {
  for (var element in x) { //for...in
    element += 1;
    console.log(element); //STRINGS
  }
  return x;
}

function addOne(x) {
  for (var element of x) { //for...of
    element += 1;
    console.log(element); // original type
  }
  return x;
}

function addOne(x) {
  for (let i = 0; i < x.length; i++) {
    x[i] += 1;
    console.log(x[i]);
  }
}

function add1(x) {
  return x.map(num => num + 1); // returns new array
}
