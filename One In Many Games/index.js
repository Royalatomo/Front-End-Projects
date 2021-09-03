// jshint esversion: 6

// Challenge-1
function calculateAge() {
    let date = new Date();
    let currentAge = parseInt(prompt("When Did You Born?"));
    let ageInDays = (date.getFullYear() - currentAge) * 365;
    document.getElementById('age-text').innerText = `You are ${ageInDays} days old`;
}

function resetAge() {
    document.getElementById('age-text').innerText = '';
}

// Challenge-2
function generateCat() {
    let imgSrc = "http://thecatapi.com/api/images/get?format=src&type=gif";
    document.getElementsByClassName('cat-holder')[0].innerHTML += `<img class="mt-3" src=${imgSrc} alt=""></img>`;
}

function resetCat() {
    location.reload();
    document.getElementsByClassName('cat-holder')[0].innerHTML = '';
}


// Challenge-3
let draws = 0;
let wins = 0;
let loose = 0;
function playRockPaper(userChoice) {
    let allChoices = ['rock', 'paper', 'scissor'];

    let computerChoice = '';
    for (let i; i < 10; i++) {
        computerChoice = Math.random();
    }

    computerChoice = allChoices[Math.floor(Math.random() * 3)];
    let matchResult = '';

    switch (computerChoice) {
        case "rock":
            if (userChoice === "rock") {
                matchResult = "Draw";
            } else if (userChoice === "paper") {
                matchResult = "You Won";
            } else if (userChoice === "scissor") {
                matchResult = "You Loose";
            }
            break;

        case "paper":
            if (userChoice === "paper") {
                matchResult = "Draw";
            } else if (userChoice === "scissor") {
                matchResult = "You Won";
            } else if (userChoice === "rock") {
                matchResult = "You Loose";
            }
            break;

        case "scissor":
            if (userChoice === "scissor") {
                matchResult = "Draw";
            } else if (userChoice === "rock") {
                matchResult = "You Won";
            } else if (userChoice === "paper") {
                matchResult = "You Loose";
            }
            break;
    }

    console.log(matchResult);
    console.log("Comp: " + computerChoice);
    console.log("User: " + userChoice);
    console.log("");

    // <img class="c3-image" onclick="playRockPaper('rock')" src="images/rock.png">
    for (let i of ["i1", "i2", "i3"]) {
        document.getElementsByClassName(i)[0].classList = ["hidden"];
    }

    let img = createElement(userChoice);
    document.getElementsByClassName('images-button')[0].appendChild(img);

    let p = document.createElement('p');
    p.innerText = matchResult;
    if (matchResult == "Draw") {
        p.setAttribute('class', 'match-result yellow-color');
        draws++;
    } else if (matchResult == "You Won") {
        p.setAttribute('class', 'match-result green-color');
        wins++;
    } else if (matchResult == "You Loose") {
        p.setAttribute('class', 'match-result red-color');
        loose++;
    }
    document.getElementsByClassName('images-button')[0].appendChild(p);

    img = createElement(computerChoice);
    document.getElementsByClassName('images-button')[0].appendChild(img);

    document.getElementsByName('c3-draws')[0].innerHTML = `Draws: ${draws}`;
    document.getElementsByName('c3-wins')[0].innerHTML = `Wins: ${wins}`;
    document.getElementsByName('c3-loose')[0].innerHTML = `Loose: ${loose}`;

    setTimeout(() => {
        resetRockPaper();
    }, 1000);
}

function createElement(name) {
    let img = document.createElement('img');
    img.setAttribute("class", "c3-image result-img");

    if (name !== "scissor") {
        img.setAttribute("src", `images/${name}.png`);
    } else {
        img.setAttribute("src", `images/${name}.png`);
        img.setAttribute("style", `border: 1vw solid #414042; padding: 10px;`);
    }
    return img;
}

function resetRockPaper() {
    document.getElementsByClassName('result-img')[0].remove();
    document.getElementsByClassName('result-img')[0].remove();

    document.getElementsByClassName('hidden')[0].classList = ["i1"];
    document.getElementsByClassName('hidden')[0].classList = ["i2"];
    document.getElementsByClassName('hidden')[0].classList = ["i3"];

    document.getElementsByClassName('match-result')[0].remove();


}


// Challenge-4

let defaultColor = [];

for (let i = 0; i < document.getElementsByTagName('button').length; i++) {
    defaultColor.push(document.getElementsByTagName('button')[i].classList.value);
}


function colorButton() {
    let color = document.getElementById('selector').value;

    for (let i = 0; i < document.getElementsByTagName('button').length; i++) {
        let button = document.getElementsByTagName('button')[i];
        if (color == "red") {
            button.classList = ['btn btn-lg btn-danger'];
        } else if (color == "blue") {
            button.classList = ['btn btn-lg btn-primary'];
        } else if (color == "yellow") {
            button.classList = ['btn btn-lg btn-warning'];
        } else if (color == "green") {
            button.classList = ['btn btn-lg btn-success'];
        } else if (color == "random") {
            let colors = ['warning', 'success', 'primary', 'danger'];
            button.classList = [`btn btn-lg btn-${colors[Math.floor(Math.random() * 4)]}`];
        } else if (color == "reset") {
            button.classList = [`btn btn-lg ${defaultColor[i]}`];
        }
    }
}


// Challenge 5
document.getElementsByName('bot')[0].checked = true;

let totalLeftScore = 0;
let totalRightScore = 0;
let position = 'left';
let playerName = "";
let botHit = false;
let botTime = 0;
let audio = '';


function makeScoreBoard(clear = true) {

    if (clear) {
        // Remove Score From Bot (if Played)
        document.getElementById('sb-1-win').innerText = 0;
        document.getElementById('sb-1-draw').innerText = 0;
        document.getElementById('sb-1-loose').innerText = 0;
        document.getElementById('sb-2-win').innerText = 0;
        document.getElementById('sb-2-draw').innerText = 0;
        document.getElementById('sb-2-loose').innerText = 0;
    }

    if (!document.getElementsByName('bot')[0].checked) {
        document.getElementById('sb-2').classList.remove('hidden');
        playerName = "Player 1";
        document.getElementsByClassName('text-left')[0].innerText = "Player 1: 0";
        document.getElementsByClassName('text-right')[0].innerText = "Player 2: 0";
    } else {
        document.getElementById('sb-2').classList.add('hidden');
        playerName = "You";
        document.getElementsByClassName('text-left')[0].innerText = "You: 0";
        document.getElementsByClassName('text-right')[0].innerText = "Dealer: 0";
    }
}

function creatImg(url) {
    let img = document.createElement('img');
    img.setAttribute('src', url);
    return img;
}

function hit() {
    document.getElementsByClassName('btn-hit')[0].disabled = false;
    document.getElementsByClassName('btn-deal')[0].disabled = true;
    if (position == 'right') {
        document.getElementsByClassName('btn-deal')[0].disabled = false;
    }

    if (playerName == '') {
        playerName = "You";
    }
    
    let chooseRandom = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'K', 'Q'];
    let no = Math.floor(Math.random() * 12);
    let url = `images/${chooseRandom[no]}.png`;
    
    if (position == 'left') {
        if (no == 0) {
            if (totalLeftScore + 11 <= 21) {
                totalLeftScore += 11;
            } else if (totalLeftScore + 11 > 21) {
                totalLeftScore += 1;
            }
        } else if (no == '9' || no == '10' || no == '11') {
            totalLeftScore += 10;
        } else {
            totalLeftScore += parseInt(chooseRandom[no]);
        }
    } else {
        if (no == 0) {
            if (totalRightScore + 11 <= 21) {
                totalRightScore += 11;
            } else if (totalRightScore + 11 > 21) {
                totalRightScore += 1;
            }
        } else if (no == '9' || no == '10' || no == '11') {
            totalRightScore += 10;
        } else {
            totalRightScore += parseInt(chooseRandom[no]);
        }
    }

    function changeAppearance() {
        

        audio = new Audio('sounds/swish.m4a');
        audio.play();
        document.getElementsByClassName(`img-${position}`)[0].appendChild(creatImg(url));
        if (((position == 'left') ? totalLeftScore : totalRightScore) > 21) {
            document.getElementsByClassName(`text-${position}`)[0].innerText = "Burst";
            document.getElementsByClassName(`text-${position}`)[0].classList.add('red-color');
            document.getElementsByClassName('btn-hit')[0].disabled = true;
            if (position == 'left') {
                totalLeftScore = `Burst`;
                document.getElementsByClassName('btn-hit')[0].disabled = true;

            } else {
                totalRightScore = "Burst";
            }
        } else {
            document.getElementsByClassName(`text-${position}`)[0].innerText = (position == 'left') ? `${playerName}: ${totalLeftScore}` : `${playerName}: ${totalRightScore}`;

            document.getElementsByClassName(`text-${position}`)[0].classList.remove('red-color');
        }
    }

    if (botHit) {
        botTime += 500;
        setTimeout(() => {
            changeAppearance();
        }, botTime);
    } else {
        changeAppearance();
    }

}

function stand() {
    // Code
    if (!document.getElementsByName('bot')[0].checked && position != 'right') {
        document.getElementsByClassName('btn-deal')[0].disabled = false;
        document.getElementsByClassName('btn-hit')[0].disabled = false;
        position = 'right';
        playerName = "Player 2";

    } else if (document.getElementsByName('bot')[0].checked && position != 'right') {
        botHit = true;
        if (totalLeftScore == "Burst") {
            totalLeftScore = 0;
        }

        position = 'right';
        playerName = "Dealer";
        while (true) {
            if (totalLeftScore < totalRightScore) {
                console.log('1');
                break;
            } else if (totalRightScore == "Burst") {
                console.log('2');
                break;
            } else if (totalRightScore >= 15) {
                console.log('3');
                break;
            }
            hit();
            document.getElementsByClassName('btn-deal')[0].disabled = false;
        }
    }
}

function deal() {

    if (totalRightScore == "Burst") {
        totalRightScore = 0;
        document.getElementsByClassName(`text-right`)[0].classList.remove('red-color');
    }
    if (totalLeftScore == "Burst") {
        totalLeftScore = 0;
        document.getElementsByClassName(`text-left`)[0].classList.remove('red-color');
    }



    // Update Score Board
    if (!document.getElementsByName('bot')[0].checked) {
        audio = new Audio('sounds/cash.mp3');
        audio.play();

        if (totalLeftScore > totalRightScore) {
            document.getElementById('sb-1-win').innerText = parseInt(document.getElementById('sb-1-win').innerText) + 1;
            document.getElementById('sb-2-loose').innerText = parseInt(document.getElementById('sb-2-loose').innerText) + 1;
        } else if (totalLeftScore < totalRightScore) {
            document.getElementById('sb-2-win').innerText = parseInt(document.getElementById('sb-2-win').innerText) + 1;
            document.getElementById('sb-1-loose').innerText = parseInt(document.getElementById('sb-1-loose').innerText) + 1;
        } else if (totalLeftScore === totalRightScore) {
            document.getElementById('sb-1-draw').innerText = parseInt(document.getElementById('sb-1-draw').innerText) + 1;
            document.getElementById('sb-2-draw').innerText = parseInt(document.getElementById('sb-2-draw').innerText) + 1;
        }
        position = 'left';
        playerName = 'Player 1: 0';
        makeScoreBoard(clear = false);
        botHit = false;
        document.getElementsByClassName('text-left')[0].innerText = "Player 1: 0";
        document.getElementsByClassName('text-right')[0].innerText = "Player 2: 0";

    } else {

        if (totalLeftScore > totalRightScore) {
            document.getElementById('sb-1-win').innerText = parseInt(document.getElementById('sb-1-win').innerText) + 1;
            audio = new Audio('sounds/cash.mp3');
            audio.play();
        } else if (totalLeftScore < totalRightScore) {
            document.getElementById('sb-1-loose').innerText = parseInt(document.getElementById('sb-1-loose').innerText) + 1;
            audio = new Audio('sounds/aww.mp3');
            audio.play();
        } else if (totalLeftScore === totalRightScore) {
            document.getElementById('sb-1-draw').innerText = parseInt(document.getElementById('sb-1-draw').innerText) + 1;
        }

        position = "left";
        playerName = "You";
        document.getElementsByClassName('text-left')[0].innerText = "You: 0";
        document.getElementsByClassName('text-right')[0].innerText = "Dealer: 0";
        botHit = false;
        botTime = 0;
    }

    // Update Score Attribute
    totalRightScore = 0;
    totalLeftScore = 0;

    // Update Score Image Board
    while (document.getElementsByClassName('img-left')[0].firstChild) {
        document.getElementsByClassName('img-left')[0].removeChild(document.getElementsByClassName('img-left')[0].firstChild);
    }

    while (document.getElementsByClassName('img-right')[0].firstChild) {
        document.getElementsByClassName('img-right')[0].removeChild(document.getElementsByClassName('img-right')[0].firstChild);
    }

    // Enable Bot
    document.getElementsByName('bot')[0].disabled = false;
    document.getElementsByClassName('btn-hit')[0].disabled = false;
}
