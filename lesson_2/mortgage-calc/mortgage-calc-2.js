const readline = require('readline-sync');
const MESSAGES = require('./mortgage-messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return Number.isNaN(number) || number <= 0;
}

let loanAmount, apr, lengthYears, monthlyRate, lengthMonths, monthlyPayment,
  runAnother;

while (true) {

  prompt(MESSAGES.getLoanAmount);
  loanAmount = Number(readline.question());
  while (invalidNumber(loanAmount)) {
    prompt(MESSAGES.invalidInput);
    loanAmount = Number(readline.question());
  }

  prompt(MESSAGES.getAPR);
  apr = Number(readline.question()) / 100;
  while (invalidNumber(apr)) {
    prompt(MESSAGES.invalidInput);
    apr = Number(readline.question());
  }

  prompt(MESSAGES.getDuration);
  lengthYears = Number(readline.question());
  while (invalidNumber(lengthYears)) {
    prompt(MESSAGES.invalidInput);
    lengthYears = Number(readline.question());
  }

  monthlyRate = apr / 12;
  lengthMonths = (Number(lengthYears.toString()[0]) * 12) + Number(lengthYears.toString()[2]);
  monthlyPayment = loanAmount * (monthlyRate /
  (1 - Math.pow((1 + monthlyRate), (-lengthMonths))));

  prompt(`Your monthly payment is $${monthlyPayment.toFixed(2)}`);
  prompt(MESSAGES.anotherCalc);
  runAnother = readline.question().toLowerCase();

  while (runAnother !== 'y' && runAnother !== 'n') {
    prompt(MESSAGES.invalidYorN);
    runAnother = readline.question().toLowerCase();
  }

  if (runAnother[0] === 'n') break;
}
