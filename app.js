/*////////////////// PART 1 CREATE FUNCTION PORTION////////////////*/
var prompt = require('sync-prompt').prompt;

/*///////////////////// GENERATE CARD FUNCTION////////////////////*/
/*var generateCards=function(){
	var deckOfCards=[{suit:'♣', face:'1'}, {suit:'♣', face:'2'},{suit:'♣', face:'3'},{suit:'♣', face:'4'},{suit:'♣', face:'5'},{suit:'♣', face:'6'},{suit:'♣', face:'7'},{suit:'♣', face:'8'},{suit:'♣', face:'9'},{suit:'♣', face:'J'},{suit:'♣', face:'Q'},{suit:'♣', face:'K'},{suit:'♣', face:'A'},
					 {suit:'♠', face:'1'}, {suit:'♠', face:'2'},{suit:'♠', face:'3'},{suit:'♠', face:'4'},{suit:'♠', face:'5'},{suit:'♠', face:'6'},{suit:'♠', face:'7'},{suit:'♠', face:'8'},{suit:'♠', face:'9'},{suit:'♠', face:'J'},{suit:'♠', face:'Q'},{suit:'♠', face:'K'},{suit:'♠', face:'A'},
					 {suit:'♥', face:'1'}, {suit:'♥', face:'2'},{suit:'♥', face:'3'},{suit:'♥', face:'4'},{suit:'♥', face:'5'},{suit:'♥', face:'6'},{suit:'♥', face:'7'},{suit:'♥', face:'8'},{suit:'♥', face:'9'},{suit:'♥', face:'J'},{suit:'♥', face:'Q'},{suit:'♥', face:'K'},{suit:'♥', face:'A'},
					 {suit:'♠', face:'1'}, {suit:'♠', face:'2'},{suit:'♠', face:'3'},{suit:'♠', face:'4'},{suit:'♠', face:'5'},{suit:'♠', face:'6'},{suit:'♠', face:'7'},{suit:'♠', face:'8'},{suit:'♠', face:'9'},{suit:'♠', face:'J'},{suit:'♠', face:'Q'},{suit:'♠', face:'K'},{suit:'♠', face:'A'}];
 
  return deckOfCards;				 
};*/
var generateCards = function() {
	var suits = ['♠','♥','♦','♣'],
        faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        cards = [];
	for(var i = 0; i < suits.length; i++) {
		for(var j = 0; j < faces.length; j++) {
			cards.push({'suit':suits[i], 'face':faces[j]}); 
		}
	}
	return cards;
};
console.log(generateCards());

/*//////////////////GENERATE SHUFFLED DECK FUNCTION////////////////*/
var shuffle=function (cards) {
  var shuffledDeck=[];
  for (var i=0; i<52; i++) {
    var randomIndex = Math.floor(Math.random() * (cards.length));
    shuffledDeck[i] = cards[randomIndex];
    cards.splice(randomIndex,1);    
  }
  return shuffledDeck;
};

/*//////////////////CALCULATE HAND FUNCTION////////////////*/
var calculateHand= function(cards){
      var total=0;
      for(var k=0; k<cards.length; k++){
      	if(cards[k].face==="A"){
      		total+=11;
      	}
      	else if( (cards[k].face==="J")||(cards[k].face==="Q")||(cards[k].face==="K")){
      		total+=10;	
      	}
        else {
        	total+= parseInt(cards[k].face);        
        }
        if(total>21){
          for(var q=0; q<=cards.length; q++){
            if(cards[q]==="A"){
            	total-=10;
            }
          }
        }
      }
  return total;
};


/*//////////////////DETERMINE WINNER FUNCTION////////////////*/
var determineWinner= function(playerOne,playerTwo){
  if(playerOne > playerTwo && playerOne<=21 && playerTwo<=21){console.log("You win with a total of:", playerOne);}
  else if (playerOne < playerTwo && playerOne<=21 && playerTwo<=21){console.log("The computer wins with a total of:", playerTwo);}
  else if (playerOne === playerTwo && playerOne!==0 && playerTwo!==0){console.log("Tie",playerOne, playerTwo);}
};

/*////////////////// PART 2 INTERACTIVE GAME PORTION////////////////*/

var name=prompt("Press enter to play Black Jack","enter");
if (name==="enter"){ 

  	//Initial draw
  	var initialDraw=2;
  	//generate and shuffle cards at begginning 
  	var cards=generateCards();
    var shuffledCards = shuffle(cards);
  	//User Hand
  	var userHand=[];
  	var userTotal=0;
  	//Computer Hand
  	var computerHand= [];
  	var computerTotal=0;
  
  	var indexofcard = 0;
  	var cardCount=52;

  while(indexofcard< 26){
    for(var i=0; i<initialDraw; i++){
         userHand.push(shuffledCards[indexofcard]);
      		indexofcard++;
      		cardCount--;
         computerHand.push(shuffledCards[indexofcard]);   
     		indexofcard++;
      		cardCount--;
    } 
    
    userTotal = calculateHand(userHand);
    computerTotal = calculateHand(computerHand);
    console.log("Your hand is:", userHand,"for a total of", userTotal);
    //hitOrStay acts as a toggle
	var hitOrStay="h";
    while(hitOrStay !== "s" && userTotal<=21){
       	var hitOrStay=prompt("Please enter (h)it or (s)tay","enter choice here");


        if(hitOrStay==="h"){
          userHand.push(shuffledCards[indexofcard]);
          indexofcard++;
          cardCount--;
          userTotal=calculateHand(userHand); 
          console.log("Your new hand is:", userHand,"for a total of", userTotal);
        }
      
      	if((userTotal>21) ||(computerTotal>21)){
        
       	  if((userTotal>21)){
          		console.log("User bust with a total of:",userTotal);
            	console.log("---------------------------------------"); 
          		userHand=[];
          		computerHand=[];
         	 	userTotal=0; 
    	 	 	computerTotal=0; 
          }
       	  else if((computerTotal>21)){
         		console.log("Computer bust with a total of:",computerTotal);
            	console.log("---------------------------------------"); 
       	  		userHand=[];
         	    computerHand=[];
         	    userTotal=0; 
    	 	    computerTotal=0;
           }
        }
      
      while( computerTotal< userTotal && computerTotal<17 && userTotal<21 && userTotal>0 && computerTotal>0){	
            computerHand.push(shuffledCards[indexofcard]);
        	indexofcard++;
       		cardCount--;
            computerTotal=calculateHand(computerHand);
      }
    }
          	determineWinner(userTotal,computerTotal);
            userHand=[];
          	computerHand=[];
   	   	 	userTotal=0;
      		computerTotal=0;
      		console.log("There are", cardCount, " cards remaining in this deck");
      		console.log("---------------------------------------");     
  }
  console.log("Game Over");
}	