let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

console.log(selectFruit(produce));

function selectFruit(produce){

  let selectArr = [];

  for (const [key, value] of Object.entries(produce)) {
    if (value === 'Fruit') {
      selectArr.push([key, value]);
    }
  }

  return Object.fromEntries(selectArr);
}

let myNumbers = [1, 4, 3, 7, 2, 6];

function doubleArray(array) {

  for (let i = 0; i < array.length; i++) {
    array[i] = array[i] * 2;
  }

  return array;
}

function doubleOddIndex(array) {
  for (let i = 0; i < array.length; i++) {
    i % 2 === 1 ? array[i] = array[i] * 2: array[i] = array[i];
  }
}

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let sum = 0;
let valueArray = Object.values(ages);

for (let i = 0; i < valueArray.length; i++) {
  sum += valueArray[i];
}

console.log(sum);
