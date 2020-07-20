const readline = require('readline-sync');

console.log('Input your loan amount');
let loanAmount = readline.question();

console.log('Input APR');
let apr = Number(readline.question()) / 100;

console.log('Input duration (in years)');
let lengthYears = readline.question();

let monthlyRate = apr / 12;
let lengthMonths = lengthYears * 12;

let monthlyPayment = loanAmount * (monthlyRate /
(1 - Math.pow((1 + monthlyRate), (-lengthMonths))));

console.log(monthlyPayment);
