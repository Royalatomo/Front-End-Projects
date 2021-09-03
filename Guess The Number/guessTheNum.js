// Function Loads When The Site Opens ----
window.onload = function () {
  
  // Check It (If Clicked) - Runs "startGame()" function
  document.getElementById("check").addEventListener("click", startGame);
  
  // reset (If Clicked) - Runs "resetGame()" function
  document.getElementById("reset").addEventListener("click", resetGame);
};



// ---------------- Core Fucntion --------------------------

// Main Function For Starting The Game ----
function startGame() {
  
  let gussedNumber = getUserGuess();
  let result = checkResult(gussedNumber, choosenNumber);

  if (result.messageType == "won") {
    
    // Starts New Game (User Won)
    showResult(getDialoge(result.messageType, result.message));
    choosenNumber = randomNumber();
  }else{

    // Continue This Game (User incorrect)
    showResult(getDialoge(result.messageType, result.message));
    displayGuessed(gussedNumber);
  }
}

// Resetting The Game
function resetGame() {
  
  clearHistory();
  choosenNumber = randomNumber();
  
  // Remove Result(red, green, yellow)
  document.getElementById("result").innerHTML = "";

  // Remove any thing in text box
  document.getElementById("guessNum").value = '';

}



// ---------------- Core Fucntion Feature --------------------------

// Choose A Random Number ----
function randomNumber() {
  let number = Math.floor(Math.random() * 100) + 1;
  return number;
}


// Get User Guessed Number ----
function getUserGuess() {
  let userGuess = document.getElementById("guessNum").value;
  document.getElementById("guessNum").value = "";
  return userGuess;
}


// Check The Result Of User Guess ---
function checkResult(guess, real) {
  
  // messageType: Warning(Low), Danger(High), Won(Win)
  // message: This show on user screen(#result)
  let result = { messageType: "", message: "" };

  if (guess == real) {
    
    // If Guess Is Correct
    result.messageType = "won";
    result.message = "Awesome!! You Won This One..";
    return result;
  } else {
    if (real > guess) {

      if (real - guess <= 5) {
        
        // If Guess Is Lower But Only 5 steps away
        result.messageType = "warning";
        result.message = "Low, But too close !!";
        return result;
      } else {
        
        // If Guess Is Lower more than 5 steps
        result.messageType = "warning";
        result.message = "Too Low !!";
        return result;
      }
    } else {
      
      // If Guess Is Higher But Only 5 steps away
      if (guess - real <= 5) {
        result.messageType = "danger";
        result.message = "high, But too close !!";
        return result;      
      } else {

        // If Guess Is Higher more than 5 steps
        result.messageType = "danger";
        result.message = "Too High !!";
        return result;
      }
    }
  }
}


// Gives Color(yellow, green, red) to message for display ----
function getDialoge(dialogType, message) {
  let dialog;

  switch (dialogType) {
    case "warning":
      dialog = "<div id='message' class='alert alert-warning'> ";
      break;

    case "danger":
      dialog = "<div id='message' class='alert alert-danger'> ";
      break;

    case "won":
      dialog = '<div id="message" class="alert alert-success"> ';
      break;
  }
  dialog += message;
  dialog += "</div>";
  return dialog;
}


// Shows Result Of Guess ----
function showResult(message) {
  document.getElementById("result").innerHTML = message;
}


// Show All Guesses User Made -----
function displayGuessed(guess){
  
  // Geeting Older Messages If There ---
  let currentHistory = document.getElementById("history").innerHTML;
  
  // Adding Older + New Guess in history ---
  document.getElementById("history").innerHTML = "<p class='history-text text-dark d-block border-success'>Your Guessed Number: " + guess + '</p>' + currentHistory;
}


// Removes History Of Guesses ----
function clearHistory(){
  document.getElementById('history').innerHTML = "";
}

// Take Number (Computer Choice)
let choosenNumber = randomNumber();


// ---------------------- Script Ends ------------------------
