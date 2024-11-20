'use strict';
const phrasesContainer = document.getElementById('phrases');
const translations = window.translations;

// Функция для заполнения фразами
function populatePhrases(translations) {
  Object.keys(translations).forEach((key) => {
    const phraseDiv = document.createElement('div');
    phraseDiv.className = 'phrase';
    phraseDiv.setAttribute('data-en', key);
    phraseDiv.setAttribute('data-ru', translations[key]);

    const textSpan = document.createElement('span');
    textSpan.className = 'text';

    const translationSpan = document.createElement('span');
    translationSpan.className = 'translation';
    translationSpan.style.display = 'none'; // Скрываем перевод по умолчанию

    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle';
    toggleButton.textContent = 'Показать перевод';

    phraseDiv.appendChild(textSpan);
    phraseDiv.appendChild(translationSpan);
    phraseDiv.appendChild(toggleButton);
    phrasesContainer.appendChild(phraseDiv);
  });

  updateText(); // Обновляем текст после добавления всех фраз

  // Добавляем обработчики событий к кнопкам
  const toggleButtons = document.querySelectorAll('.toggle');
  toggleButtons.forEach((button) => {
    button.addEventListener('click', toggleTranslation);
  });

  // Добавляем слушатель на переключатели языка
  const languageRadios = document.querySelectorAll('input[name="language"]');
  languageRadios.forEach((radio) => {
    radio.addEventListener('change', updateText);
  });

  // Добавляем обработчик события для клавиатуры
  document.addEventListener('keydown', handleKeyPress);
}

// Функция для переключения видимости перевода
function toggleTranslation() {
  const translation = this.previousElementSibling; // Соседний элемент translation
  const phraseDiv = this.parentElement; // Родительский элемент фразы
  if (translation.style.display === 'none') {
    translation.style.display = 'inline';
    this.textContent = 'Скрыть перевод';
    phraseDiv.classList.add('selected');
  } else {
    translation.style.display = 'none';
    this.textContent = 'Показать перевод';
    phraseDiv.classList.remove('selected');
  }
}

// Функция для обновления текста на основе выбранного языка
function updateText() {
  const language = document.querySelector(
    'input[name="language"]:checked',
  ).value;

  const phrases = document.querySelectorAll('.phrase');
  phrases.forEach((phrase) => {
    const enText = phrase.getAttribute('data-en');
    const ruText = phrase.getAttribute('data-ru');

    if (language === 'en') {
      phrase.querySelector('.text').textContent = enText;
      phrase.querySelector('.translation').textContent = ruText;
    } else {
      phrase.querySelector('.text').textContent = ruText;
      phrase.querySelector('.translation').textContent = enText;
    }
  });
}

// Обработчик нажатия клавиш
function handleKeyPress(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    // Поддержка Enter и Space
    const selectedPhrase = document.querySelector('.phrase.selected');
    if (selectedPhrase) {
      const toggleButton = selectedPhrase.querySelector('.toggle');
      toggleTranslation.call(toggleButton);
    }
    event.preventDefault(); // Предотвращаем действия по умолчанию
  }
}

// Загружаем переводы при загрузке страницы
populatePhrases(translations);

// Добавляем обработчик клика для выделения фразы
const phrases = document.querySelectorAll('.phrase');
phrases.forEach((phrase) => {
  phrase.addEventListener('click', () => {
    phrases.forEach((p) => p.classList.remove('selected')); // Убираем выделение от всех
    phrase.classList.add('selected'); // Добавляем выделение к текущей фразе
  });
});
