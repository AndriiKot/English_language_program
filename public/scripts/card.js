'use strict';

import { handlers } from './handlers.js';

const lastCount = document.querySelector('#lastCount');
const currentCount = document.querySelector('#currentCount');
const cardPhraseEN = document.querySelector('.card__phrase-en');
const cardPhraseRU = document.querySelector('.card__phrase-ru');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

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
      handlers.show();
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
});
