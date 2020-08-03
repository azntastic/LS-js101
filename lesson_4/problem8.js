let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let currentAge = Object.values(ages)[0];

for (let i = 0; i < Object.values(ages).length; i++) {
  if (Object.values(ages)[i] < currentAge) {
    currentAge = Object.values(ages)[i];
  }
}

console.log(currentAge);

// let sum = 0;
// let valueArray = Object.values(ages);
//
// for (let i = 0; i < valueArray.length; i++) {
//   sum += valueArray[i];
// }
//
// console.log(sum);
//
// Object.values(ages).forEach(num => sum += num);
