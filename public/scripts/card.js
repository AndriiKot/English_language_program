'use strict';

import { handlers } from './handlers.js';

const translations = window.translations;

const arrayPhrases = Object.entries(translations);
const lenArrayPhrases = arrayPhrases.length;
const currentCount = 1;

const countFirstPhrase = document.querySelector('.card__count--element__first');
const countLastPhrase = document.querySelector('.card__count--element__last');

countFirstPhrase.textContent = `${currentCount}`;
countLastPhrase.textContent = lenArrayPhrases;

document.body.addEventListener('click', (event) => {
  const activeBtn = event.target;
  const activeID = activeBtn.id;
  handlers[activeID]();
});
