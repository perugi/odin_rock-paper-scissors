// Randomly returns 'rock', 'paper' or 'scissors'.
function getComputerChoice() {
    shapes = ['rock', 'paper', 'scissors'];

    return shapes[Math.floor(Math.random() * shapes.length)];
}

// Plays a single round of rock-paper-scissors.
function playRound(playerSelection, computerSelection) {
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

    // Return the appropriate string.
    switch (winner) {
        case 'draw':
            return 'The round is a draw.';
        case 'player':
            return `You win! ${toTitleCase(playerSelection)} beats ${computerSelection}.`;
        case 'computer':
            return `You lose! ${toTitleCase(computerSelection)} beats ${playerSelection}.`;
        default:
            throw new Error('Round results are invalid (not player, computer or draw.');
    }
}

function toTitleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Plays the game 5 times by getting the user and computer input and printing out the results.
function game() {
    // Define the valid shapes for checking the user input
    validShapes = ['rock', 'paper', 'scissors'];

    for (let i = 0; i < 5; i++) {
        // Ask the user for input until he inputs a valid shape
        let playerSelection = "";
        while (!validShapes.includes(playerSelection.toLowerCase())) {
            playerSelection = prompt("Input your selection [rock, paper, scissors]:");
        }

        console.log(playRound(playerSelection, getComputerChoice()));
    }

    console.log("Game over, thanks for playing!")
}

game();