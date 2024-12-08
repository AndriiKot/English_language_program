'use strict';

import { isCountLimit } from './utils.js';

const dataJson = window.translations;
const array = Object.entries(dataJson);

const createTemplatePrase = (mainPhrase, translation) => {
  const template = `
      <h1 class="card__phrase main-language">${mainPhrase}</h1>
      <h2 class="card__phrase translation">${translation}</h2>
  `;
  return template;
};

class Card {
  constructor() {
    this.arrayPhrases = array;

    this.defaultCount = 1;
    this.currentCount = this.defaultCount;
    this.maxCount = array.length;

    this.lastCountElement = document.querySelector('#lastCount');
    this.currentCountElement = document.querySelector('#currentCount');
    this.nextBtn = document.querySelector('#next');
    this.prevBtn = document.querySelector('#prev');
    this.showBtn = document.querySelector('#show');
    this.addBtn = document.querySelector('#add');
    this.radioBtnEn = document.querySelector('#en');
    this.radioBtnRu = document.querySelector('#ru');
    this.radioBtnEn.checked = true;

    this.initialize();
  }

  initialize() {
    this.lastCountElement.textContent = this.maxCount;
    this.updateDataCard();
  }

  updateDataCard() {
    this.currentCountElement.textContent = `${this.currentCount}`;
    this.targetPhrase = this.arrayPhrases[this.currentCount - 1];
    this.mainPhrase = this.radioBtnEn.checked
      ? this.targetPhrase[0]
      : this.targetPhrase[1];
    this.translation = this.radioBtnRu.checked
      ? this.targetPhrase[0]
      : this.targetPhrase[1];
    const template = createTemplatePrase(this.mainPhrase, this.translation);
    document.querySelector('#phrases').innerHTML = `${template}`;
  }

  next() {
    if (!isCountLimit(this.currentCount, this.maxCount)) {
      this.currentCount++;
      this.updateDataCard();
    }
  }

  prev() {
    if (this.currentCount > 1) {
      this.currentCount--;
      this.updateDataCard();
    }
  }
  add() {
    console.log('add');
  }
  show() {
    console.log('show');
  }
  en() {
    this.radioBtnEn.checked = true;
    this.radioBtnRu.checked = false;
    this.updateDataCard();
  }
  ru() {
    this.radioBtnEn.checked = false;
    this.radioBtnRu.checked = true;
    this.updateDataCard();
  }
}

const card = new Card();

document.body.addEventListener('click', (event) => {
  const activeBtn = event.target;
  const activeID = activeBtn.id;

  switch (activeID) {
    case 'next':
      card.next();
      break;
    case 'prev':
      card.prev();
      break;
    case 'add':
      card.add();
      break;
    case 'show':
      card.show();
      break;
    case 'en':
      card.en();
      break;
    case 'ru':
      card.ru();
      break;
    default:
      break;
  }
});
