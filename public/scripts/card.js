'use strict';

import { handlers } from './handlers.js';

const lastCount = document.querySelector('#lastCount');
const currentCount = document.querySelector('#currentCount');
const cardPhrase = document.querySelector('.card__phrase');

const translations = window.translations;
const arrayPhrases = Object.entries(translations);
const lenArrayPhrases = arrayPhrases.length;

const defaultCount = 1;

currentCount.textContent = `${defaultCount}`;
lastCount.textContent = lenArrayPhrases;
cardPhrase.textContent = arrayPhrases[defaultCount - 1][0];

document.body.addEventListener('click', (event) => {
  const activeBtn = event.target;
  const activeID = activeBtn.id;
  const count = +currentCount.textContent;
  switch (activeID) {
    case 'next':
      currentCount.textContent = handlers.next(count, lenArrayPhrases);
      cardPhrase.textContent =
        arrayPhrases[`${+currentCount.textContent - 1}`][0];
      break;
    case 'prev':
      currentCount.textContent = handlers.prev(count, lenArrayPhrases);
      cardPhrase.textContent =
        arrayPhrases[`${+currentCount.textContent - 1}`][0];
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
