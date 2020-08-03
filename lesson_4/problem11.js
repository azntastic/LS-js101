let statement = "The Flintstones Rock";

let newArray = statement.split('').filter(num => num !== ' ');

let newObj = {}

newArray.forEach(element => {
  newObj[element] = newObj[element] || 0;
  newObj[element] ++;
})

console.log(newObj);

let result = ['a', 'b', 'c'].filter(function(item) {
  true;
});
