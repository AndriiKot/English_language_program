'use strict';

import { isCountLimit } from './utils.js';

const objDataJson = window.translations;
const arrArray = Object.entries(objDataJson);

class Card {
  constructor() {
    this.arrArrayPhrases = arrArray;

    this.numDefaultCount = 1;
    this.numCurrentCount = this.numDefaultCount;
    this.numMaxCount = arrArray.length;

    this.elLastCount = document.querySelector('#lastCount');
    this.elCurrentCount = document.querySelector('#currentCount');
    this.elNextBtn = document.querySelector('#next');
    this.elPrevBtn = document.querySelector('#prev');
    this.elAddBtn = document.querySelector('#add');
    this.elRadioBtnTranslOn = document.querySelector('#translation-on');
    this.elRadioBtnTranslOff = document.querySelector('#translation-off');
    this.elRadioBtnEn = document.querySelector('#en');
    this.elRadioBtnRu = document.querySelector('#ru');
    this.elMainPhrase = document.querySelector('#main-phrase');
    this.elTranslationPhrase = document.querySelector('#translation-phrase');

    this.#initialize();
  }

  #initialize() {
    this.elLastCount.textContent = this.numMaxCount;
    this.elCurrentCount.textContent = this.numCurrentCount;
    this.elPrevBtn.disabled = true;
    this.elTranslationPhrase.style.visibility = 'hidden';
    this.#updateDataCard();
  }

  #createTemplatePrase(strMainPhrase, strTranslation) {
    this.elMainPhrase.textContent = strMainPhrase;
    this.elTranslationPhrase.textContent = strTranslation;
  }

  #getCurrentPhrase() {
    const arrCurrentPhrase = this.arrArrayPhrases[this.numCurrentCount - 1];
    const strPhrase = arrCurrentPhrase[0] || '';
    const strTrans = arrCurrentPhrase[1] || '';
    return {
      strPhrase,
      strTrans,
    };
  }

  #getPhrasesMain() {
    const objCurrentPhrase = this.#getCurrentPhrase();
    const boolIsEn = this.elRadioBtnEn.checked;
    const boolIsRu = this.elRadioBtnRu.checked;

    return {
      strMainPhrase: boolIsEn
        ? objCurrentPhrase.strPhrase
        : objCurrentPhrase.strTrans,
      strTransPhrase: boolIsRu
        ? objCurrentPhrase.strTrans
        : objCurrentPhrase.strPhrase,
    };
  }

  #updateDataCard() {
    this.elCurrentCount.textContent = `${this.numCurrentCount}`;
    const { strMainPhrase, strTransPhrase } = this.#getPhrasesMain();
    this.#createTemplatePrase(strMainPhrase, strTransPhrase);
    this.elAddBtn.disabled = false;
  }

  next() {
    if (!isCountLimit(this.numCurrentCount, this.numMaxCount)) {
      this.numCurrentCount++;
      this.elPrevBtn.disabled = false;
      this.#updateDataCard();
    }
    if (this.numCurrentCount === this.numMaxCount) {
      this.elNextBtn.disabled = true;
    }
  }

  prev() {
    if (this.numCurrentCount > 1) {
      this.elNextBtn.disabled = false;
      this.numCurrentCount--;
      this.#updateDataCard();
    } else {
      this.elPrevBtn.disabled = true;
    }
    if (this.numCurrentCount === 1) {
      this.elPrevBtn.disabled = true;
    }
  }

  add() {
    this.elAddBtn.disabled = true;

    const { strPhrase, strTrans } = this.#getCurrentPhrase();

    const dataToSend = {
      phrase: strPhrase,
      translation: strTrans,
    };

    fetch('/api/add-phrase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        // Обновите интерфейс или выполните другие действия по необходимости
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  en() {
    this.elRadioBtnEn.checked = true;
    this.#updateDataCard();
  }

  ru() {
    this.elRadioBtnRu.checked = true;
    this.#updateDataCard();
  }
  on() {
    this.elTranslationPhrase.style.visibility = 'visible';
  }
  off() {
    this.elTranslationPhrase.style.visibility = 'hidden';
  }
}

const objCard = new Card();

document.body.addEventListener('click', (event) => {
  const elActiveBtn = event.target;
  const strActiveID = elActiveBtn.id;
  switch (strActiveID) {
    case 'next':
      objCard.next();
      break;
    case 'prev':
      objCard.prev();
      break;
    case 'add':
      objCard.add();
      break;
    case 'en':
      objCard.en();
      break;
    case 'ru':
      objCard.ru();
      break;
    case 'translation-on':
      objCard.on();
      break;
    case 'translation-off':
      objCard.off();
      break;
    default:
      break;
  }
});
