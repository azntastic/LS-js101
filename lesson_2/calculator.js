const readline = require('readline-sync');

console.log('Welcome to Calculator!');

console.log("What's the first number?");
let num1 = Number(readline.question());

console.log("What's the second number?");
let num2 = Number(readline.question());

console.log("What Operation?\n1) Add \n2) Subtract \n3) Multiply \n4) Divide");
let operation = Number(readline.question());

let output;
switch (operation) {
  case 1:
    output = num1 + num2;
    break;
  case 2:
    output = num1 - num2;
    break;
  case 3:
    output = num1 * num2;
    break;
  case 4:
    output = num1 / num2;
    break;
  default:
    console.log('Please select a valid operation');

}

console.log(`Result: ${output}`);
