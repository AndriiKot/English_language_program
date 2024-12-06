'use strict';

import { handlers } from './handlers.js';
import { isCountLimit } from './utils.js';

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

const updateCount = (delta) => {
  const count = +currentCount.textContent;
  const newCount = count + delta;

  if (newCount >= 1 && newCount <= lenArrayPhrases) {
    currentCount.textContent = newCount;
    cardPhraseEN.textContent = arrayPhrases[newCount - 1][0];
    cardPhraseRU.textContent = arrayPhrases[newCount - 1][1];

    nextBtn.disabled = isCountLimit(newCount, lenArrayPhrases);
    prevBtn.disabled = isCountLimit(newCount, 1);
  }
};

document.body.addEventListener('click', (event) => {
  const activeBtn = event.target;
  const activeID = activeBtn.id;

  switch (activeID) {
    case 'next':
      updateCount(1);
      break;
    case 'prev':
      updateCount(-1);
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
});
