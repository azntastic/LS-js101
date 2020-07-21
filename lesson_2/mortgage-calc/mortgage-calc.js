// Dependencies
const readline = require('readline-sync');
const MESSAGES = require('./mortgage-messages.json');

// Functions
function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  /*
  Number() coercion function trims whitespace automatically,
  and second condition makes sure that empty user input,
  which is coerced into 0, will fail this validation.

  Would it be better to follow the solution & write a condition
  that explicitly targets case where user inputs nothing or only
  whitespace characters?
  */
  return Number.isNaN(number) || number <= 0;
}

// Main

/*
Is it better to declare these variables inside the main while function?
I declared them out here for readability, but I suppose declaring inside
the function would avoid an potential scoping concerns?
*/
let loanAmount, apr, lengthYears, monthlyRate, lengthMonths, monthlyPayment,
  runAnother;

// Main Program Loop
while (true) {

  // Get loan amount
  prompt(MESSAGES.getLoanAmount);
  loanAmount = Number(readline.question());
  // Validation
  while (invalidNumber(loanAmount)) {
    prompt(MESSAGES.invalidInput);
    loanAmount = Number(readline.question());
  }
  // Get APR
  prompt(MESSAGES.getAPR);
  apr = Number(readline.question()) / 100;
  // Validation
  while (invalidNumber(apr)) {
    prompt(MESSAGES.invalidInput);
    apr = Number(readline.question());
  }
  // Get loan duration
  prompt(MESSAGES.getDuration);
  lengthYears = Number(readline.question());
  // Validation
  while (invalidNumber(lengthYears)) {
    prompt(MESSAGES.invalidInput);
    lengthYears = Number(readline.question());
  }

  // Processing variables for use in equation
  monthlyRate = apr / 12;
  lengthMonths = (Number(lengthYears.toString()[0]) * 12) + Number(lengthYears.toString()[2]);

  // Calculate monthly payment
  monthlyPayment = loanAmount * (monthlyRate /
  (1 - Math.pow((1 + monthlyRate), (-lengthMonths))));

  // Output
  // Couldn't find a simple way to use template literal with JSON
  prompt(`Your monthly payment is $${monthlyPayment.toFixed(2)}`);
  prompt(MESSAGES.anotherCalc);
  runAnother = readline.question().toLowerCase();

  // Validate user reponse
  while (runAnother !== 'y' && runAnother !== 'n') {
    prompt(MESSAGES.invalidYorN);
    runAnother = readline.question().toLowerCase();
  }

  // Run again (or not)
  if (runAnother[0] === 'n') break;
}
