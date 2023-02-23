let playerScore = 0;
let computerScore = 0;
let roundNo = 1;

const shapeBtns = document.querySelectorAll(".shape");
shapeBtns.forEach(shapeBtn => shapeBtn.addEventListener('click', playRound));

// Plays a single round of rock-paper-scissors.
function playRound(e) {
    playerSelection = e.target.id;
    computerSelection = getComputerChoice();
    const winner = getWinner(playerSelection, computerSelection);

    updateInfo(winner, playerSelection, computerSelection);

    if (playerScore === 5 || computerScore === 5) endGame(winner);
}


// Randomly returns 'rock', 'paper' or 'scissors'.
function getComputerChoice() {
    shapes = ['rock', 'paper', 'scissors'];

    return shapes[Math.floor(Math.random() * shapes.length)];
}


// Based on rock paper scissor rules and the selection parameters, return the winner of the round.
function getWinner(playerSelection, computerSelection) {
    // Convert player selection to lower case to avoid input errors.
    playerSelection = playerSelection.toLowerCase();

    // Judge who the winner is.
    let winner;
    if (playerSelection === computerSelection) {
        winner = 'draw';
    } else if (playerSelection === 'rock') {
        if (computerSelection === 'scissors') {
            winner = 'player';
        } else {
            winner = 'computer';
        }
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            winner = 'player';
        } else {
            winner = 'computer';
        }
    } else if (playerSelection === 'scissors') {
        if (computerSelection === 'rock') {
            winner = 'player';
        } else {
            winner = 'computer';
        }
    }

    return winner
}


// After a round winner has been determined, update the info in the DOM.
function updateInfo(winner, playerSelection, computerSelection) {
    roundInfo = document.querySelector("#round-info");
    playerScoreDisplay = document.querySelector("#player-score");
    computerScoreDisplay = document.querySelector("#computer-score");
    switch (winner) {
        case 'player':
            roundInfo.textContent = `You win! ${toTitleCase(playerSelection)} `;
            if (playerSelection === "scissors") roundInfo.textContent += "beat ";
            else roundInfo.textContent += "beats ";
            roundInfo.textContent += `${computerSelection}.`;

            playerScoreDisplay.textContent = ++playerScore;
            break;
        case 'computer':
            roundInfo.textContent = `You lose. ${toTitleCase(computerSelection)} `;
            if (computerSelection === "scissors") roundInfo.textContent += "beat ";
            else roundInfo.textContent += "beats ";
            roundInfo.textContent += `${playerSelection}.`;

            computerScoreDisplay.textContent = ++computerScore;
            break;
        case 'draw':
            roundInfo.textContent = "It's a draw."
            break;
        case 'default':
            throw new Error('Invalid response received from getWinner function.')
    }

    gameInfo = document.querySelector("#game-info");
    gameInfo.textContent = `Round ${++roundNo} - Select your weapon:`;

    playerLog = document.querySelector("#player-logs");
    newPlayerLog = document.createElement("li");
    newPlayerLog.textContent = toTitleCase(playerSelection);
    playerLog.appendChild(newPlayerLog);

    computerLog = document.querySelector("#computer-logs");
    newComputerLog = document.createElement("li");
    newComputerLog.textContent = toTitleCase(computerSelection);
    computerLog.appendChild(newComputerLog);
}


// Helper function, returning the passed string in Title Case (capitalizes only the first 
// character of the first word in case multiple are contained in the string).
function toTitleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


// Display the information at the end of the game and allow the user to press the spacebard for a new game.
function endGame(winner) {

    gameInfo = document.querySelector("#game-info")
    roundInfo = document.querySelector("#round-info");

    gameInfo.textContent = "Game over! "
    if (winner === "player") gameInfo.textContent += "You win!"
    else gameInfo.textContent += "The computer wins!"

    roundInfo.textContent = "Press spacebar to play another game."

    shapeBtns.forEach(btn => btn.disabled = true);
    document.addEventListener("keydown", newGame);
}

// If spacebar was pressed, reset the game start and update the DOM to show this.
function newGame(e) {
    if (e.keyCode != 32) return;

    playerScore = 0;
    computerScore = 0;
    roundNo = 1;

    gameInfo = document.querySelector("#game-info");
    gameInfo.textContent = `Round 1 - Select your weapon:`;
    ;

    shapeBtns.forEach(btn => btn.disabled = false);

    roundInfo = document.querySelector("#round-info");
    roundInfo.innerHTML = "&nbsp;"

    playerScoreDisplay = document.querySelector("#player-score");
    computerScoreDisplay = document.querySelector("#computer-score");
    playerScoreDisplay.textContent = "0";
    computerScoreDisplay.textContent = "0";

    playerLogs = document.querySelectorAll("#player-logs > li")
    playerLogs.forEach(playerLog => playerLog.remove())

    computerLogs = document.querySelectorAll("#computer-logs > li")
    computerLogs.forEach(computerLog => computerLog.remove())
}