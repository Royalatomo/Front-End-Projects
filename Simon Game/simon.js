// Variables Used For Querry
/*jshint esversion: 6 */

let userColorList = []; // Stores the color user clicked
let levelAdded = []; // stores the color computer choosed
let timeTaken = 600; // color blink time
let gameStarted = false; // check if game started by pressing a key
let Current_Level = 1; // user level
let song = new Audio(); // audio playing


// Generates Random Number (For choosing color)
randomNumber = () => {
    let colorToChoose = Math.floor(Math.random() * 4) + 1;
    return [colorToChoose];
};

// Used to choose color (By Computer)
levelMaker = () => {
    // Random number are mapped to --
    let colorMapper = {
        1: 'green',
        2: 'red',
        3: 'yellow',
        4: 'purple'
    };
    let colorToRepeat = colorMapper[randomNumber()[0]];
    levelAdded.push(colorToRepeat);
};


// Blink the color box
blinkColor = (color, className, time = null) => {

    // If Time Is not specified then end on transitionend event..
    if (time == null) {
        $(`.${color}`).addClass(className); // add's the class
        $(document).on('transitionend', () => {
            $(`.${color}`).removeClass(className); // removes the class
        });
    }
    
    // If Time Is specified then end on that time interval..
    else {
        $(`${color}`).addClass(className); // add's the class
        setTimeout(() => {
            $(`${color}`).removeClass(className); // removes the class
        }, time);
    }
};


// This will call when the user won the level
wonPlayer = () => {
    Current_Level += 1; // incriment the level
    blinkColor('body', 'won-bg', 400); // make bg-color green for 0.4s
    $('.heading-text').text("Won"); // Show Text On Top "WON"
    
    setTimeout(() => {
        $('.heading-text').text("Your are in Level: " + Current_Level);
    }, 400); // After 0.4s(won) show the user current level(this text)
    
    play(); // Add a new color to the "levelAdded" variable
};


// This will call when the user lose the level
losePlayer = () => {
    blinkColor('body', 'lose-bg', 400); // make bg-color red for 0.4s
    $('.heading-text').text("Lose"); // Show Text On Top "Lose" for 0.2s
    song.pause(); // pause any audio if running
    song = new Audio('../mp3/simon/wrong.mp3'); // load wrong.mp3 audio
    song.play(); // play wrong.mp3 audio
    
    setTimeout(() => {
        $('.heading-text').text("Level: " + Current_Level);
    }, 200); // Show User the level he was in before lossing (after 0.2s)
    
    setTimeout(() => {
        location.reload(); // reset the game
    }, 2000); // Reload the Page To Set Everything back to default after 2s
};


// Logic to check if user choosed correct colors
levelClear = () => {
    
    // Checks is user lose
    //(So that lose and won won't come together)
    let gameOver = false;
    
    // if user choose a color
    if (userColorList.length != 0) {
        // Check If User color matches to computer color
        for (let i = 0; i < userColorList.length; i++) {
            // If It Doesn't match
            if (userColorList[i] != levelAdded[i]) {
                losePlayer(); // User lose the current level
                gameOver = true;
            }
        }

        // Check If computer color list matches to user color list
        if (userColorList.length === levelAdded.length && !gameOver) {
            wonPlayer(); // Matches than user cleared the level
        }
    }
};


// Responsible to check for user click
activateClick = () => {
    
    // Add's event listener to color boxes
    active_click_helper = (color, songName) => {
        
        // On given color add's event listener(click)
        $(`.${color}`).on('click', () => {
            song.pause(); // pause audio if playing
            song = new Audio(songName); // load the song
            song.play(); // play the song when user click's on the box
            userColorList.push(color); // add clicked color to userColorList
            levelClear(); // check if user cleared the level
            blinkColor(color, 'shadow'); // highlight the user clicked color box
        });
    };
    
    // Color Boxes and Audio to play when clicked -------
    active_click_helper('green', './sounds/green.mp3');
    active_click_helper('red', './sounds/red.mp3');
    active_click_helper('yellow', './sounds/yellow.mp3');
    active_click_helper('purple', './sounds/purple.mp3');
};


// Main Function run's in every new level
play = () => {
    userColorList = []; // removes pervious level color(user)
    levelMaker(); // creates new level
    
    setTimeout(() => {
        blinkColor(levelAdded[levelAdded.length-1], 'boxBlink');
    }, timeTaken); // blink the new color which was added
};


// To Start the game check for any keypress ---------
$(document).on('keypress', () => {
    // If User didn't pressed the key before
    if (!gameStarted) {
        play(); // create level
        activateClick(); // activate click
        gameStarted = true; // won't run this again when key presses

         // Shows the current level in which the user is --
        $('.heading-text').text("Your are in Level: " + Current_Level);
    }
});
