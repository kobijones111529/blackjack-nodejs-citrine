# Blackjack

Today, you must work on building this classic card game! Specifically, you'll be building a version that can be played *in a terminal*.

### The Rules of the Game:
* https://bicyclecards.com/how-to-play/blackjack/

### Base Mode User Stories:
* When the game begins, a user should:
  * see that they currently have $100
  * be prompted to place a bet
* After placing a bet, a user should:
  * see one card that the dealer was dealt
  * see the two cards they were dealt
  * play out their hand by being prompted to *hit* (receive another card) or *stay* (stop at their current total)
    * for base mode, do not include options for *splitting*, *doubling down*, or *insurance*
* A user's turn ends when they:
  * are dealt a 21
  * choose to stay
  * go *over* 21 as a result of *hitting*
* After the user's turn ends, the dealer's turn should be automated according to the following:
  * The dealer must *hit* when their total is below 17
  * The dealer must choose to *stay* when their total is 17 or above
* After the dealer's turn ends, the user's total money must be updated:
  * a tie (or *push*) results in the user getting to keep their bet
  * beating the dealer results in the user receiving winnings equal to the amount of their bet
  * beating the dealer by being dealt a 21 results in the user receiving winnings equal to 1.5 times the amount of their bet
* The game ends when the user:
  * runs out of money

* Note: For base mode, it's easiest to assume that you'll reshuffle the deck before each hand is played.
