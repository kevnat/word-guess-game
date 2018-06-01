//GLOBAL VARIABLES

//Arrays and variable for holding data

var wordOptions = ['functions','variables','methods','elements','events','scope']
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0; 
var blanksAndSuccesses = []; //j _ _ _ _ _ _ _ 
var wrongLetters = []; 


//game counters 
var winCount = 0; 
var lossCount = 0; 
var guessesLeft = 9;


//functions reusable blocks of code I call upon when needed 

function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    //reset 
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //populate blanks and successes with right number of blanks 
    for (var i = 0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    //change html to reflect round conditions 
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");    
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;


    //testing/debugging
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters (letter) {
    //check if the letter exists in the word

    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++){
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    //check where in word letter exists, then populate our blanksandsuccesses array

    if (isLetterInWord){
        for (var i=0; i < numBlanks; i++){
            if(selectedWord[i] == letter){
                blanksAndSuccesses[i] = letter;
            }
        }
    }
    //letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }
    //testing
   console.log(blanksAndSuccesses);

}

function roundComplete(){
    console.log("Win Count: " +  winCount + " | Loss Count: " + lossCount + " | Guesses Left " + numGuesses);

    // update the html to reflect the most recent count stats 
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" "); 
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");


    //check if user won
    if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
        winCount++; 
        alert("You Won!");

        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }

    //check if user lost
    else if  (guessesLeft == 0){
        lossCount++; 
        alert("You Lost!"); 

        //update html 
        document.getElementById("lossCounter").innerHTML = lossCount;
        
        startGame();

    }



}

//MAIN PROCESS

//initiates the code for the first time
startGame();

//register keyclicks 
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    //Testing/Debugging
}