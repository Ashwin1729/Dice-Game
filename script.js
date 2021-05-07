'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore0, currentScore1, playing;

//initial state conditions
const init = function () {
  currentScore0 = 0;
  currentScore1 = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

init();

//active player switch function
function playerSwitch() {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  if (!player0.classList.contains('player--active')) {
    current0El.textContent = 0;
  } else {
    current1El.textContent = 0;
  }
  currentScore0 = 0;
  currentScore1 = 0;
}

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      if (player0.classList.contains('player--active')) {
        currentScore0 += dice;
        current0El.textContent = currentScore0;
      } else {
        currentScore1 += dice;
        current1El.textContent = currentScore1;
      }
    } else {
      playerSwitch();
    }
  }
});

// holding score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    if (player0.classList.contains('player--active')) {
      score0El.textContent = Number(score0El.textContent) + currentScore0;
    } else {
      score1El.textContent = Number(score1El.textContent) + currentScore1;
    }

    if (
      Number(score0El.textContent) >= 100 ||
      Number(score1El.textContent) >= 100
    ) {
      playing = false;
      diceEl.classList.add('hidden');
      if (player0.classList.contains('player--active')) {
        player0.classList.add('player--winner');
        player0.classList.remove('player--active');
      } else {
        player1.classList.add('player--winner');
        player1.classList.remove('player--active');
      }
    } else {
      playerSwitch();
    }
  }
});

//New game functionality
btnNew.addEventListener('click', init);
