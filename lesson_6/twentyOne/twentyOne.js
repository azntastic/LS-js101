let cards = {
  2: 4,
  3: 4,
  4: 4,
  5: 4,
  6: 4,
  7: 4,
  8: 4,
  9: 4,
  10: 4,
  'j': 4,
  'Q': 4,
  'K': 4,
  'A': 4
};

let currentDeck = [];
let dealerCards = [];
let playerCards = [];

function initializeDeck(){
	Object.keys(cards).forEach(key => {
  	for (let i = 0; i < cards[key]; i++) {
    	currentDeck.push(key);
    }
  })
 }

function shuffleDeck(currentDeck){
	for (let index = currentDeck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [currentDeck[index], currentDeck[otherIndex]] = [currentDeck[otherIndex], currentDeck[index]]; // swap elements
  }
}
