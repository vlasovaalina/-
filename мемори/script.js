'use strict';

const start = document.querySelector('#start');
const starts = document.querySelector('#starts');
const game = document.querySelector('#game');
const final = document.querySelector('#final');
const controls = document.querySelector(".controls-container");
let interval;
let firstCard = false;
let secondCard = false;
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;

start.addEventListener('click', () => {
  start.hidden = true;
  game.hidden = false;

});

start.addEventListener('click', () => {
  starts.hidden = true;
  game.hidden = false;

});


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
