'use strict';

let myRandomNumber = Math.trunc(Math.random() * 20) + 1;
let userScore = 20;
let message = document.querySelector('.message');
let score = document.querySelector('.score');
let highScore = document.querySelector('.highscore');
let labelScore = document.querySelector('.label-score');
let container = document.querySelector('.container');
let introDiv = document.querySelector('.input-intro');
let username = document.querySelector('.username').value;
let hint_print = document.querySelector('.hint-print');

//Audio functions
const introAudio = () => {
  let audio = new Audio('/sounds/intro.mp3');
  audio.play();
};
const endAudio = () => {
  let audio1 = new Audio('/sounds/end.mp3');
  audio1.play();
};
const winAudio = () => {
  let audio2 = new Audio('/sounds/end.mp3');
  audio2.play();
};

//Enter function
document.querySelector('.button').addEventListener('click', function () {
  username = document.querySelector('.username').value;
  if (!username) {
  } else {
    introDiv.style.display = 'none';
    container.style.display = 'block';
    introAudio();
  }
});

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

//Array Generator to choose maximum score && also if you want to display previous scores
let highFinalScore = [];
const compare = () => {
  for (let i = 0; i < highFinalScore.length; i++) {
    let maxScore = highFinalScore[0];
    if (highFinalScore[i] < maxScore) {
      maxScore = highScore.innerHTML;
    } else {
      highScore.innerHTML = highFinalScore[i];
    }
  }
};

//function for check button
const btnCheck = function () {
  let guess = Number(document.querySelector('.guess').value);
  //When there is no input
  if (!guess) {
    displayMessage('🛑 No Number!');
    //When player wins
  } else if (guess > 20 || guess < 0) {
    displayMessage('Ooops number between 1 - 20 🙄');
  } else if (myRandomNumber === guess) {
    displayMessage(`🎉 Congrats ${username.toLocaleUpperCase()}`);
    document.querySelector('.number').textContent = myRandomNumber;
    document.body.style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '25rem';
    highFinalScore.push(userScore);
    compare();
    winAudio();
    // console.log(highFinalScore); //array of which the highScore is picked

    //When guess is wrong
  } else if (guess !== myRandomNumber) {
    if (userScore > 0) {
      displayMessage(
        `${guess > myRandomNumber ? '📈 Too high' : '📉 Too low'}`
      );
      userScore--;
      score.innerHTML = userScore;
    } else {
      displayMessage('GAME OVER...You lost the game');
      message.style.fontSize = '2.5rem';
      endAudio();
    }
  }
};

//EventListener for check button
let btn = document.querySelector('.check');
let click = btn.addEventListener('click', btnCheck);

//function for Again Button
const resetFunction = function () {
  userScore = 20;
  score.innerHTML = userScore;
  myRandomNumber = Math.trunc(Math.random() * 20) + 1;
  document.body.style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start Guessing... ');
  document.querySelector('.guess').value = '';
  hint_print.textContent = '';
};

//EventListener for Again Button
const reset = document.querySelector('.again');
reset.addEventListener('click', resetFunction);

//EventListener for hint button
document.querySelector('.hint').addEventListener('click', function () {
  hint_print.textContent =
    myRandomNumber % 2 === 0 ? 'The number is a even' : 'The number is an odd';
});
