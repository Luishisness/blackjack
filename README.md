[Homework #1 - Blackjack](http://foureyes.github.io/csci-ua.0480-fall2014-002/assignments.html#hw01)

Overview
Description
Create a commandline player Blackjack game with 2 players - the user and the computer.

each player is dealt 2 cards from a 52 card deck, with each card representing some numeric value
each player can choose to be dealt more cards ("hit") or stop being dealt cards ("stand")
the sum of the numeric values of the cards in a player's hand determines if they've one
once both players have either chosen to stand or have a hand with a total that's more than 21 ("bust"), the hands are compared
the player with the hand that's closest to 21 without going over wins
ties are possible (either same total, or both player "bust")
See the sample output at the end of these instructions.

Submission Process
The final version of your assignment should be in GitHub, but a submission should still be sent via NYU Classes.

push your changes to the homework repository on GitHub
add the URL of the repository to your assignment submission in NYU Classes
Regarding the Due Date

although code is in GitHub, date of submission in NYU Classes will be used to determine late/not late (see submission process below)
commits later than that date will be handled on a case-by-case basis
24 hour grace period where NYU Classes is still open
after that, no late homeworks will be accepted
Preparation
(0 points, but obvs required for homework!) Tools
Ensure that you have the following tools installed:

node
npm (usually comes with node)
git
(4 points) Use Git
send me your github username (email me at jversoza at cs dot nyu dot edu with subject "CSCI-UA.0480-002 GitHub Username" … or contact me via NYU classes)
wait for a notification that states that you've been added to the class's github organization
…then go to the class github page
find the repository that starts with either your NYU NetID or your github name, and ends with homework01 (for example, jjv222-homework01)
use the url in the right-hand bar, under HTTPS clone URL to clone the homework … using the commandline client, that would be (with GITHUB_REPOSITORY_URL being the url you copied from the right hand bar):
 git clone GITHUB_REPOSITORY_URL
go into the directory that was just created
create a file called .gitignore in the same directory
add the following line to the file so that git ignores any locally installed node modules:
 node_modules
commit and push your work to your remote repository
(1 points) Download a Module Using npm, Start Your Actual Code
in your repository directory, install the node module, sync-prompt, by running this command in your project's directory:
 npm install sync-prompt
note that the sync-prompt module allows you to prompt for user input synchronously
this is very different from how node.js apps usually operate
however, for our purposes, using sync prompt is fine (for now), and it mimics the browser's prompt functionality well
installing sync-prompt will create a folder called node_modules in the directory that you ran npm in (don't worry, it'll be ignored by git!)
create a file called app.js (if it isn't already there!)
in your app.js file, add the line:
var prompt = require('sync-prompt').prompt;
this imports the function prompt from the sync-prompt module into your program
write the remainder of your code in this file
as you write your code, make sure that you make at least three commits total (one for prep, part 1 and part 2). more commits are better
git add --all
git commit -m 'your commit message'
push your code frequently
git push
Part 1
To write this program, we can break down the game into several functions:

(5 points) generateCards()
parameters: none
return: an array of objects, with each object representing a card
description: generate and return an array of card objects
each card object will have the following properties
suit (4 possible values, the strings: ♠, ♥, ♦, ♣
face (13 possible values, the strings '2' .. '10', 'J', 'Q', 'K', 'A'
each combination of suit and face should represented
there should be a total of 52 objects
example list with two card objects [{ suit: '♣', face: '2' }, { suit: '♦', face: '6' } ]
example usage: var cards = generateCards();
(10 points) shuffle(Array)
parameters: an array of card objects (see return value of) generateCards
return: a randomly ordered array objects, with each object representing a card
description: shuffle the array of cards passed in as an argument and return shuffled cards
use a shuffling algorithm to rearrange the order of the array of cards passed in
some approaches include:
algorithm 1:
maintain two decks of cards, the originally passed in deck, and a new empty deck where shuffled cards are placed
continually pick a random index (use Math.random()) from the original array of cards
remove the item at that index using the array's splice method, and use the push method to place it in the shuffled deck (the newly created array)
do this until there are no more cards in the original deck
algorithm 2:
do the same as above, but instead of maintaining a new deck… use the end of the original deck as to store the shuffled cards
pick a random card… and swap it with the last card
pick another random card, but limit the choice to cards up to, but no including the last card, and swap it with the 2nd to last card
do this until there are no longer cards to shuffle
return the shuffled deck
example usage: var cards = shuffle(cards);
(note that you may end up mutating the array that's passed in as a parameter; that's ok for now)
(10 points) calculateHand(Array)
parameters: an array of card objects (see return value of) generateCards
return: a Number that represents the total of all of the cards in the hand
description: calculate and return the total numeric value of a hand
each card has a value:
number cards ('2' … '10') can translated directly to numeric values: '2' → 2
face cards ('J', 'Q', 'K') are worth 10 each
aces ('A') are worth either 1 or 11 depending on which value brings the hand closer to 21 without going over
some examples are:
'K', '3', '5' = 18
'A', 'A', 'A', '8' = 21
'6', 'A', = 17
one algorithm for dealing with aces is:
count each ace as 11
after calculating the total, if the total is greater than 21…
continually subtract 10 for each 'A' in the hand
example usage: var total = calculateHand(playerHand);
(5 points) determineWinner(Number, Number)
parameters: the first number should represent the total for the player's hand, and the second total should represent the total for the computer's hand
return: a string that represents who one: "Player", "Computer", or "Tie"
description: determine the winner based on the totals passed in, and return the string representation of the winner
the player with the total closest to 21 without going over wins
if both totals are the same, or if both players "bust", it's a tie
example usage: var winner = determineWinner(playerTotal, computerTotal);
Part 2
(15 points) Use the above functions to create an interactive commandline game.
continually "deal" 2 cards to the computer and the player (remove the from the shuffled deck, add them to the players' hands)
do this as long as the number of cards in the shuffled deck is greater than or equal to half of the original deck (26)
when the hands are dealt…
continually ask the player if they want to (h)it or (s)tand
use prompt to collect the player's command - h or s
based on the command, either deal another card, or stand
if the player chooses stand, stop
if the dealt card results in the total going over 21, stop
once the player has stopped… the computer will play its hand
the computer will continually "hit" as long as the total of its cards are less than 17
once the computer has gone over 17, stop
compare the computer and player hand totals
determine the winner
see the example output below as a sample implementation

Example Output

Your hand is: 7♥ K♥ ... for a total of 17
(h)it or (s)tay
> s
Your hand: 7♥ K♥ (17), Computer hand: K♦ Q♦ (20)
Computer Wins

There are 48 cards left in the deck
-----------------------

Your hand is: 7♣ A♠ ... for a total of 18
(h)it or (s)tay
> h
Your hand: 7♣ A♠ A♥ (19)
(h)it or (s)tay
> s
Your hand: 7♣ A♠ A♥ (19), Computer hand: 10♦ 9♥ (19)
Tie!

There are 43 cards left in the deck
-----------------------

.
.
. (a few more hands are dealt... 'til the last one below)
.
.

Your hand is: A♦ 5♦ ... for a total of 16
(h)it or (s)tay
> h
Your hand: A♦ 5♦ 6♦ (12)
(h)it or (s)tay
> h
Your hand: A♦ 5♦ 6♦ 9♠ (21)
(h)it or (s)tay
> s
Your hand: A♦ 5♦ 6♦ 9♠ (21), Computer hand: A♣ 7♠ (18)
Player Wins

There are 25 cards left in the deck
-----------------------

Less than 26 cards left. Game over!

