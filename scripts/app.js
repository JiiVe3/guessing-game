let hiddenNumber = 0;
let difficulty = 8;
let guesses = [];

// Run when Start/End button is clicked
function initialiseGame() {
    if (document.getElementById('start').textContent === 'Start') {
        hiddenNumber = Math.floor(Math.random() * 100) + 1; // Generates the random button

        // Resets Game area text and enables game area
        guesses = [];
        document.getElementById('result').textContent = '';
        document.getElementById('guess').classList.remove('disabled');
        document.getElementById('input').disabled = false;
        document.getElementById('history').innerHTML = '';

        document.getElementById('start').textContent = 'End';

        // Disables difficulty selection buttons
        document.getElementById('easy').classList.add('disabled');
        document.getElementById('normal').classList.add('disabled');
        document.getElementById('hard').classList.add('disabled');
    } else {
        // Disables the game area
        document.getElementById('result').textContent = `You failed to guess the number ${hiddenNumber}.`;
        document.getElementById('guess').classList.add('disabled');
        document.getElementById('input').disabled = true;
        document.getElementById('start').textContent = 'Start';

        if (guesses.length !== 1) {
            document.getElementById('history').innerHTML = `You guessed ${guesses.length} times.<br/><br/>Your guesses:<br/>${guesses.join(', ')}`;
        } else if (guesses.length === 0) {
            document.getElementById('history').innerHTML = ``;
        } else {
            document.getElementById('history').innerHTML = `You guessed ${guesses.length} time.<br/><br/>Your guess:<br/>${guesses.join(', ')}`;
        }

        // Activates difficulty selection buttons
        document.getElementById('easy').classList.remove('disabled');
        document.getElementById('normal').classList.remove('disabled');
        document.getElementById('hard').classList.remove('disabled');
    }
}

// Run when a Difficulty button is clicked. Will switch difficulty and change button bgcolor
function selectDifficulty(id) {
    switch (id) {
        case 'easy':
            if(document.getElementById('easy').classList.contains('disabled')) {break;} // Checks if the button is disabled
            difficulty = 12;
            document.getElementById('easy').classList.add('active');
            document.getElementById('normal').classList.remove('active');
            document.getElementById('hard').classList.remove('active');
            break;
        case 'hard':
            if(document.getElementById('hard').classList.contains('disabled')) {break;} // Checks if the button is disabled
            difficulty = 4;
            document.getElementById('easy').classList.remove('active');
            document.getElementById('normal').classList.remove('active');
            document.getElementById('hard').classList.add('active');
            break;
        default:
            if(document.getElementById('normal').classList.contains('disabled')) {break;} // Checks if the button is disabled
            difficulty = 8;
            document.getElementById('easy').classList.remove('active');
            document.getElementById('normal').classList.add('active');
            document.getElementById('hard').classList.remove('active');
            break;
    }
}

// Run when Guess button is clicked
function checkGuess(guess) {
    if(!document.getElementById('guess').classList.contains('disabled') && guess !== '') { // Checks if the button is disabled
        let have = ' have';
        // Checks if guessed value is higher or lower than the random number and changes the text accordingly
        if (guess > hiddenNumber) {
            document.getElementById('result').textContent = 'The number is lower than what you guessed.';
        } else if (guess < hiddenNumber) {
            document.getElementById('result').textContent = 'The number is higher than what you guessed.';
        } else {

            // Number is guessed correctly so the game area will be disabled and difficulty buttons enabled
            have = ''
            document.getElementById('result').textContent = `You guessed the number ${hiddenNumber} correctly!`;
            document.getElementById('guess').classList.add('disabled');
            document.getElementById('input').disabled = true;
            document.getElementById('start').textContent = 'Start';
            document.getElementById('easy').classList.remove('disabled');
            document.getElementById('normal').classList.remove('disabled');
            document.getElementById('hard').classList.remove('disabled');
        }
        guesses.push(guess);
        if (guesses.length >= difficulty) {

            // User ran out of guesses so the game area will be disabled and difficulty buttons enabled
            have = ''
            document.getElementById('result').textContent = `You failed to guess the number ${hiddenNumber}.`;
            document.getElementById('guess').classList.add('disabled');
            document.getElementById('input').disabled = true;
            document.getElementById('start').textContent = 'Start';
            document.getElementById('easy').classList.remove('disabled');
            document.getElementById('normal').classList.remove('disabled');
            document.getElementById('hard').classList.remove('disabled');
        }

        // User is informed how many guesses they have made and also what they have been
        if (guesses.length !== 1) {
            document.getElementById('history').innerHTML = `You${have} guessed ${guesses.length} times.<br/><br/>Your guesses:<br/>${guesses.join(', ')}`;
        } else {
            document.getElementById('history').innerHTML = `You${have} guessed ${guesses.length} time.<br/><br/>Your guess:<br/>${guesses.join(', ')}`;
        }
    }
}

// EventListeners for different buttons
document.getElementById('easy').addEventListener('click', () => selectDifficulty('easy'));
document.getElementById('normal').addEventListener('click', () => selectDifficulty('normal'));
document.getElementById('hard').addEventListener('click', () => selectDifficulty('hard'));
document.getElementById('start').addEventListener('click', () => initialiseGame());
document.getElementById('guess').addEventListener('click', () => checkGuess(document.getElementById('input').value));