const prompt = require('prompt-sync')()

const deck = [];
for (let i = 1; i <= 13; i++) {
  deck.push({ number: i, count: 4 });
}

function valueOfCard(number) {
  if (number === 1) {
    return 11;
  } else if (number >= 10) {
    return 10;
  } else {
    return number;
  }
}

function valueOfHand(cards) {
  let sum = 0;
  for (const card of cards) {
    sum += card
  }
  return sum
}

function dealCard(deck) {
  const filteredDeck = deck.filter(card => {
    return card.count > 0
  })
  let index = random(1, filteredDeck.length - 1);
  
  const card = filteredDeck[index - 1]
  card.count--

  return valueOfCard(card.number)
}


function playerTurn(hand) {
  console.log('Your hand is', hand)
  let action = prompt('Hit or stay?: ')

  while (action === 'hit') {
    hand.push(dealCard(deck))
    console.log('Your hand is', hand)
    action = prompt('Hit or stay?: ')
  }

  return valueOfHand(hand)
}

function dealerTurn(hand) {
  while (valueOfHand(hand) < 17) {
    hand.push(dealCard(deck))
  }
  return valueOfHand(hand)
}

function winner(playerHandValue, dealerHandValue) {
  if (playerHandValue > 21) {
    return 'Player bust'
  }

  if (playerHandValue > dealerHandValue) {
    return 'Player wins'
  } else if (dealerHandValue > playerHandValue) {
    return 'Dealer wins'
  } else {
    return 'Draw'
  }
}


function round() {
  const playersHand = [dealCard(deck), dealCard(deck)]
  const dealersHand = [dealCard(deck), dealCard(deck)]

  const playerHandValue = playerTurn(playersHand)
  const dealerHandValue = dealerTurn(dealersHand)

  console.log('Player hand value:', playerHandValue)
  console.log('Dealer hand value:', dealerHandValue)

  const roundWinner = winner(playerHandValue, dealerHandValue)
  console.log(roundWinner)
}

function game() {
  let playing = true
  while (playing) {
    round()
    const playAgain = prompt('Play again? (y/n): ')
    playing = playAgain === 'y'
  }
}

game()

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
