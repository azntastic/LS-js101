// Dependencies
const readline = require('readline-sync');

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
  return Number.isNaN(number) || number < 0;
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
  prompt('Input your loan amount (digits, no special characters)');
  loanAmount = Number(readline.question());
  // Validation
  while (invalidNumber(loanAmount)) {
    prompt('Invalid input. Please input numbers only');
    loanAmount = Number(readline.question());
  }
  // Get APR
  prompt('Input APR (if the interest rate is 5%, input 5)');
  apr = Number(readline.question()) / 100;
  // Validation
  while (invalidNumber(apr)) {
    prompt('Invalid input. Please input numbers only');
    apr = Number(readline.question());
  }
  // Get loan duration
  prompt('Input loan duration (in years)');
  lengthYears = Number(readline.question());
  // Validation
  while (invalidNumber(lengthYears)) {
    prompt('Invalid input. Please input numbers only');
    lengthYears = Number(readline.question());
  }

  // Processing variables for use in equation
  monthlyRate = apr / 12;
  lengthMonths = lengthYears * 12;

  // Calculate monthly payment
  monthlyPayment = loanAmount * (monthlyRate /
  (1 - Math.pow((1 + monthlyRate), (-lengthMonths))));

  // Output
  prompt(`Your monthly payment is $${monthlyPayment.toFixed(2)}`);
  prompt('Would you like to run another calculation? (y/n)');
  runAnother = readline.question().toLowerCase();

  // Validate user reponse
  while (runAnother !== 'y' && runAnother !== 'n') {
    prompt('invalid input. Please input either y or n');
    runAnother = readline.question().toLowerCase();
  }

  // Run again (or not)
  if (runAnother[0] === 'n') break;
}
