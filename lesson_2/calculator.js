const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');

let run = true;
let num1, num2, operation, output, response;

while (run) {
  prompt(MESSAGES.welcome);

  prompt("What's the first number?");
  num1 = readline.question();

  while (invalidNumber(num1)) {
    prompt('input a valid number.');
    num1 = readline.question();
  }

  prompt("What's the second number?");
  num2 = readline.question();

  while (invalidNumber(num2)) {
    prompt('input a valid number.');
    num2 = readline.question();
  }

  prompt("What Operation?\n1) Add \n2) Subtract \n3) Multiply \n4) Divide");
  operation = Number(readline.question());

  while (invalidOp(operation)) {
    prompt('Please select a valid operation');
    operation = Number(readline.question());
  }

  let output;
  switch (operation) {
    case 1:
      output = Number(num1) + Number(num2);
      break;
    case 2:
      output = Number(num1) - Number(num2);
      break;
    case 3:
      output = Number(num1) * Number(num2);
      break;
    case 4:
      output = Number(num1) / Number(num2);
      break;
  }

  prompt(`Result: ${output}. Want to run another calculation? (y/n)`);
  response = readline.question();

  response === 'y' ? prompt('Ok.'): run = false;
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return Number.isNaN(Number(number)) || number.trimStart() === '';
}

function invalidOp(number) {
  if (number > 0 && number < 5) {
    return false;
  }
  return true;
}

/*
while (!['1', '2', '3', '4'].includes(operation)) {
  prompt('Must choose 1, 2, 3 or 4');
  operation = readline.question();
}
*/
