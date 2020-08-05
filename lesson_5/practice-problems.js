// Question 1

let arr = ['10', '9', '2', '4', '6', '7'];


console.log(arr.sort((a, b) => {
  if (a < b) {
    return -1;
  } else if (a === b) {
  	return 0;
  } else {
  	return 1;
  }
}))

console.log(arr.sort((a, b) => Number(b) - Number(a))); //explicit type coercion better

// Question 2

let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];

books.sort((a, b) => Number(a.published) - Number(b.published));

// Question 3 find 'g'

let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
arr1[2][1][3];

let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
arr2[1].third[0];

let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
arr3[2].third[0][0];

let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
obj1.b[1];

let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }}
Object.keys(obj2.third)[0];

// Question 4 change 3 to 4
let arr1 = [1, [2, 3], 4];
arr1[1][1] = 4;

let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
arr2[2] = 4;

let obj1 = { first: [1, 2, [3]] };
obj1.first[2][0] = 4

let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj2.a.a[2] = 4

// Question 5

//All genders...
let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};
let newArr = [];

for (name in munsters) {
  newArr.push(munsters[name].age);
}

console.log(newArr.reduce((acc, number) => acc + number));

//or

let newArr = []

Object.entries(munsters).forEach(element => newArr.push(element[1].age));

console.log(newArr.reduce((acc, number) => acc + number));

//Male gender

let newArr = [];

for (name in munsters) {
  if (munsters[name].gender === 'male') {
    newArr.push(munsters[name].age);
  }
}

console.log(newArr.reduce((acc, number) => acc + number));

// Their solution
let totalMaleAge = 0;

for (let member in munsters) {
  if (munsters[member]['gender'] === 'male') {
    totalMaleAge += munsters[member].age;
  }
}

console.log(totalMaleAge); // => 444

// Question 6
for (let name in munsters) {
  console.log(`${name} is a ${munsters[name].age}-year-old ${munsters[name].gender}`)
}

//Their solution
Object.entries(munsters).forEach(entry => {
  let name = entry[0];
  let age = entry[1]['age'];
  let gender = entry[1].gender;

  console.log(`${name} is a ${age}-year-old ${gender}.`);
});

// Question 8

let workingArray = Object.values(obj).reduce((acc, element) => acc.concat(element), []);
// Built my own version of 'flat()'!!

let vowels = ['a', 'e', 'i', 'o', 'u'];

console.log(Object.values(obj).flat().join('').split('').filter((element) => vowels.includes(element)));

// Their solution
let vowels = 'aeiou';

Object.values(obj).forEach(arr => {
  arr.forEach(word => {
    word.split('').forEach(char => {
      if (vowels.includes(char)) {
        console.log(char);
      }
    });
  });
});

// Question 9

let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

console.log(arr.map((subArr) => {
  if (typeof subArr[0] === 'string'){ //NB typeof does not have cap O
    return subArr.slice().sort();
  } else {
    return subArr.slice().sort((a, b) => a -b);
  }
}));

// Question 10

let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

console.log(arr.map((subArr) => {
  if (typeof subArr[0] === 'string'){
    return subArr.slice().sort((a, b) => {
    if (a < b) {
    	return 1;
    } else if (a === b) {
    	return 0;
    } else {
    	return -1;
    }
    });
  } else {
    return subArr.slice().sort((a, b) => b - a);
  }
}));

// Question 11

let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let output = arr.map((obj) => {

	let serialized = JSON.stringify(obj);
  let deepCopied = JSON.parse(serialized);

  for (let key in deepCopied) {
  	deepCopied[key] += 1;
  }

  return deepCopied;
})

console.log(output);

// Their solution => no need to deep copy, just assign new object w/ key & incremented val
let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

arr.map(obj => {
  let incrementedObj = {};

  for (let key in obj) {
    incrementedObj[key] = obj[key] + 1;
  }

  return incrementedObj;
}); // => [ { a: 2 }, { b: 3, c: 4 }, { d: 5, e: 6, f: 7 } ]

arr; // => [ { a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 } ]

// Question 12

let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

let output = arr.map(element => {
	return element.filter(num => {
  	if (num % 3 === 0) {
    	return true;
    } else {
    	return false;
    }
  })
})

console.log(output);
// My solution was too verbose, see below

arr.map(subArr => {
  return subArr.filter(num => num % 3 === 0);
});
// => [ [], [ 3 ], [ 9 ], [ 15, 18 ] ]

// Question 13
// My solution
let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

arr.sort((a, b) => sumOdd(a) - sumOdd(b))

function sumOdd(array) {
	return array.reduce((acc, num) => {
  	if (num % 2 !== 0) {
    	acc += num;
    }
    return acc;
  }, 0)
}

// Their solution
arr.sort((a, b) => {
  let oddSumA = a.filter(num => num % 2 === 1)
                 .reduce((sum, next) => sum + next);
  let oddSumB = b.filter(num => num % 2 === 1)
                 .reduce((sum, next) => sum + next);

  return oddSumA - oddSumB;
});

// Question 14
let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let newArr = []

let capitalize = word => word[0].toUpperCase() + word.slice(1);

for (let thing in obj) {
  if (obj[thing].type === 'fruit') {
    newArr.push(obj[thing].colors.map(color => capitalize(color)));
  } else {
    newArr.push(obj[thing].size.toUpperCase());
  }
}

console.log(newArr);

//Their solution
let capitalize = word => word[0].toUpperCase() + word.slice(1);

Object.values(obj).map(attributes => {
  if (attributes['type'] === 'fruit') {
    return attributes['colors'].map(char => capitalize(char));
  } else {
    return attributes['size'].toUpperCase();
  }
});

// Question 15

let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let newArr = [];

arr.forEach(obj => {
  if (Object.values(obj).flat().every((num) => num % 2 === 0)) {
    newArr.push(obj)
  }
});

console.log(newArr);

// Their solution ---> should keep in mind they want a return
arr.filter(obj => {
  return Object.values(obj).every(subArr => {
    return subArr.every(num => num % 2 === 0);
  });
});

// => [ { e: [ 8 ], f: [ 6, 10 ] } ]

// for...of vs for...in => use for/in for objects

// Question 16 ... brain stopped functioning
// My solution

let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

function toObj(array) {

	let output = {}
	let keys = []
	let properties = []

  for (let element of arr) {
  	keys.push(element[0]);
  	properties.push(element[1]);
  }

  for (let i = 0; i < keys.length; i++) {
		output[keys[i]] = properties[i];
	}

	return output
}

console.log(toObj(arr));

// Their solution

let obj = {};
arr.forEach(subarray => {
  let key = subarray[0];
  let value = subarray[1];

  obj[key] = value;
});

obj; // { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

// Question 17 ?????
function generateUUID() {
  let characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let sections = [8, 4, 4, 4, 12];

  let uuid = '';
  sections.forEach((section, sectionIndex) => {
    for (let index = 1; index <= section; index++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      uuid += characters[randomIndex];
    }

    if (sectionIndex < sections.length - 1) {
      uuid += '-';
    }
  });

  return uuid;
}

generateUUID(); // => '02e51c2f-dacd-c319-53b5-e40e6e8c1f78'
generateUUID(); // => '39038ab9-3b95-43d8-6959-5d785ccb9b69'
generateUUID(); // => 'f7d56480-c5b2-8d4d-465f-01a4ea605729'
