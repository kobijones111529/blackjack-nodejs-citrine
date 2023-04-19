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

  while (valueOfHand(hand) < 21) {
    console.log('Your hand is', hand)
    let action = prompt('Hit or stay?: ')
    if (action !== 'hit') {
      break
    }

    hand.push(dealCard(deck))
  }

  if (valueOfHand(hand) > 21) {
    console.log('Bust!')
  }

  return valueOfHand(hand)
}

function dealerTurn(hand) {
  while (valueOfHand(hand) < 17) {
    hand.push(dealCard(deck))
  }
  return valueOfHand(hand)
}

function round(playerMoney) {
  let bet = Number(prompt(`Place your bet (you have $${playerMoney}): `))
  while (Number.isNaN(bet) || bet > playerMoney) {
    console.log('Invalid bet')
    bet = Number(prompt(`Place your bet (you have $${playerMoney}): `))
  }

  const playersHand = [dealCard(deck), dealCard(deck)]
  const dealersHand = [dealCard(deck), dealCard(deck)]

  const playerHandValue = playerTurn(playersHand)
  const dealerHandValue = dealerTurn(dealersHand)

  console.log('Player hand value:', playerHandValue)
  console.log('Dealer hand value:', dealerHandValue)

  if (playerHandValue > 21) {
    console.log('Player bust!')
    playerMoney -= bet
  } else if (playerHandValue === 21) {
    console.log('Blackjack!')
    playerMoney += bet * 1.5
  } else if (dealerHandValue > 21 || playerHandValue > dealerHandValue) {
    console.log('Player wins!')
    playerMoney += bet
  } else if (dealerHandValue > playerHandValue) {
    console.log('Dealer wins')
    playerMoney -= bet
  } else {
    console.log('Push')
  }

  return playerMoney
}

function game() {
  let playerMoney = 100

  let playing = true
  while (playing) {
    playerMoney = round(playerMoney)

    console.log(`You have $${playerMoney}`)
    if (playerMoney <= 0) {
      console.log('Go home')
      playing = false
    } else {
      const playAgain = prompt('Play again? (y/n): ')
      playing = playAgain === 'y'
    }
  }
}

game()

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
