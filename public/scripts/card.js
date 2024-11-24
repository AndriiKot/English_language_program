'use strict';

import { validationCurrentCount } from './validators.js';

const translations = window.translations;

const arrayPhrases = Object.entries(translations);
const lenArrayPhrases = arrayPhrases.length;
const currentCount = 1;

const countFirstPhrase = document.querySelector('.card__count--element__first');
const countLastPhrase = document.querySelector('.card__count--element__last');

countFirstPhrase.textContent = `${currentCount}`;
countLastPhrase.textContent = lenArrayPhrases;

const handlers = {
  'card__button--next': () => {
    validationCurrentCount(); // test
    console.log('next');
  },
  'card__button--prev': () => {
    console.log('prev');
  },
  'card__button--show': () => {
    console.log('translation');
  },
  'card__button--add': () => {
    console.log('add');
  },
};

document.body.addEventListener('click', (event) => {
  const activeBtn = event.target;
  const activeClassList = activeBtn.classList;

  activeClassList.forEach((className) => {
    if (handlers[className]) {
      handlers[className]();
    }
  });
});
