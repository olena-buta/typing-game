const timeNow = document.getElementById('time-now');
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGame = document.getElementById('end-game-container');
const settingBtn = document.getElementById('setting-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty');

const words = ['равлик', 'світлина', 'дахолаз', 'копіярка', 'голярня', 'переспів', 'складанка', 'пристрій', 'наплічник', 'персанок', 'відгук', 'мармизка', 'усміхайлик', 'вживанка', 'стінопис', 'дармовис', 'видиво', 'сирник', 'складанка', 'вада'];

let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

showTimeNow();
showWord();

function showTimeNow() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  timeNow.innerText = `${hours}:${minutes}:${seconds}`;

  setTimeout(showTimeNow, 1000);
}

function showSetting() {
  settings.classList.toggle('hide');
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function showWord() {
  randomWord = getRandomWord()
  word.innerText = `${randomWord}`;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function updateTime() {
  time--;
  timeEl.innerText = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endGame.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endGame.style.display = 'flex';
}

// Events
settingBtn.addEventListener('click', showSetting);
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    showWord();
    updateScore();
    e.target.value = '';

    if (difficulty === 'easy') {
      time += 5;
    } else if (difficulty === 'medium') {
      time += 3;
    } else if (difficulty === 'hard') {
      time += 2;
    }
    updateTime();
  }
});

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
  location.reload();
});