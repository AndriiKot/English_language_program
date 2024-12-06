'use strict';

import { handlers } from './handlers.js';

const lastCount = document.querySelector('#lastCount');
const currentCount = document.querySelector('#currentCount');
const cardPhraseEN = document.querySelector('.card__phrase-en');
const cardPhraseRU = document.querySelector('.card__phrase-ru');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const inputEn = document.querySelector('.card__inputs [value="en"]');
// const inputRu = document.querySelector('.card__inputs [value="ru"]');

if (inputEn.checked) {
  cardPhraseRU.style.visibility = 'hidden';
} else {
  cardPhraseEN.style.visibility = 'hidden';
}

const translations = window.translations;
const arrayPhrases = Object.entries(translations);
const lenArrayPhrases = arrayPhrases.length;

const defaultCount = 1;

currentCount.textContent = `${defaultCount}`;
lastCount.textContent = lenArrayPhrases;
cardPhraseEN.textContent = arrayPhrases[defaultCount - 1][0];
cardPhraseRU.textContent = arrayPhrases[defaultCount - 1][1];

document.body.addEventListener('click', (event) => {
  const activeBtn = event.target;
  const activeID = activeBtn.id;
  const count = +currentCount.textContent;
  switch (activeID) {
    case 'next':
      currentCount.textContent = handlers.next(count, lenArrayPhrases);
      cardPhraseEN.textContent =
        arrayPhrases[`${+currentCount.textContent - 1}`][0];
      cardPhraseRU.textContent =
        arrayPhrases[`${+currentCount.textContent - 1}`][1];
      break;
    case 'prev':
      currentCount.textContent = handlers.prev(count, lenArrayPhrases);
      cardPhraseEN.textContent =
        arrayPhrases[`${+currentCount.textContent - 1}`][0];
      cardPhraseRU.textContent =
        arrayPhrases[`${+currentCount.textContent - 1}`][1];
      break;
    case 'add':
      handlers.add();
      break;
    case 'show':
      if (inputEn.checked) {
        cardPhraseRU.style.visibility = 'visible';
      }
      // handlers.show(cardPhraseRU);
      break;
    default:
      break;
  }
  if (+currentCount.textContent === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  if (+currentCount.textContent === lenArrayPhrases) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
  // if (inputEn.checked) {
  //   cardPhraseRU.style.visibility = 'hidden';
  //   cardPhraseEN.style.visibility = 'visible';
  // } else {
  //   cardPhraseEN.style.visibility = 'hidden';
  //   cardPhraseRU.style.visibility = 'visible';
  // }
});
