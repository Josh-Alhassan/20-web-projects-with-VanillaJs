//  Select Elements
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endgameEl = document.querySelector('#end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for the game
const words =  [
    'faith',
    'word',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'inter-denominational',
    'north',
    'dependent',
    'transformation',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'codescript',
    'drag',
    'loving'
  ];

//   Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text on start
text.focus();

// Start Counting Down
const timeInterval = setInterval(updateTime, 1000);

// Generate Random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// console.log(getRandomWord());

// Add word to DOM function
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// Game Over function show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1> Time ran out </h1>
        <p> Your final score is ${score} </p>
        <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listener

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // clear input flied
        e.target.value = '';

        // time += 5;
        if(difficulty === 'hard') {
            time =+ 2;
        } else if(difficulty === 'medium') {
            time =+ 3;
        } else {
            time =+ 5;
        }

        updateTime()
    }
})

// SETTING BUTTON CLICK
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})