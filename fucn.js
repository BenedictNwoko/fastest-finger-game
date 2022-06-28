const settingsBtn = document.querySelector('#setting-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.querySelector('#difficulty');
const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endgameEl = document.querySelector('#end-game-container');

const words = [
    'good',
    'south',
    'independent',
    'steering',
    'gold',
    'home',
    'artificial',
    'intelligence',
    'nine',
    'fame',
    'dismiss',
    'drop',
    'caring',
    'sing',
    'utensil',
    'airplane',
    'pilot',
    'basket',
    'juice',
    'ukraine',
    'captain',
    'this',
    'game',
    'is',
    'difficult'
  ];

//intialise random word variable
let randomWord;

//Initialise score variable
let score = 0;

//initialize time variable
let time = 10;

//initialise difficulty variable and set it to value in local storage or Medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Set selected value of difficulty
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Focus on input on start
text.focus();

//Start counting down time
const timeInterval = setInterval(updateTime, 1000) //this allows us run a specific function at time intervals, e.g every 1s

//Function to generate random word from words array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

//function to update time
function updateTime(){
    time--;
    timeEl.innerHTML = `${time}s`;

    if(time === 0) {
        clearInterval(timeInterval);
        //end game
        gameOver();
    }
}

//Game over and show end screen
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Here is your final score: ${score}</p>
    <button onclick="window.location.reload()">Reload</button>    
    `;
    endgameEl.style.display = 'flex';
}

//Function to add random word to dom
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//Function to update score
function updateScore() {
    score += 2;
    scoreEl.innerHTML = score; 
}

addWordToDOM();

//Event listener to listen for text input
text.addEventListener('input', function(e) {
    const typedText = e.target.value;

    if(typedText === randomWord) {
        addWordToDOM();
        updateScore();

        //To clear after added to word
        e.target.value = '';

        //Add time everytime they get the word
        //Different difficulties
        if(difficulty === "hard"){
            time += 1;
        } else if(difficulty === "medium"){
            time += 2;
        } else{
            time += 4;
        }

        updateTime();
    }
});

//Settings functionality

//change settings on select
settingsForm.addEventListener('change', function(e){
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

//Settings button click
settingsBtn.addEventListener('click', function(){
    settings.classList.toggle('show');
});