require('dotenv').config();
const express = require('express');
const path = require('node:path');
const fs = require('node:fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const validLevels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const isValidLesson = (lesson, startRang = 1, endRang = 50) => {
  const parsedLesson = parseInt(lesson);
  return !isNaN(parsedLesson) && parsedLesson >= startRang && parsedLesson <= endRang;
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

async function getTranslations(level, lesson) {
  try {
    const filePath = path.join(__dirname, 'data', level, `${level}-L${lesson}.json`);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Ошибка чтения файла: ${error}`);
    return {}; // Возвращаем пустой объект при ошибке
  }
}

async function getLesson(req, res) {
  const { level, lesson } = req.params;

  if (validLevels.includes(level)) {
    if (isValidLesson(lesson)) {
      const translations = await getTranslations(level, lesson);
      if (Object.keys(translations).length === 0) {
        res.render('developingLesson');
      } else {
        res.render('lesson', {
          level: level,
          lesson: lesson,
          translations: translations,
        });
      }
    } else {
      res.status(404).send('Неверный номер урока');
    }
  } else {
    res.status(404).send('Уровень не найден');
  }
}

async function getTranslationsHotRepeat(req, res) {
  const { level } = req.params;

  if (validLevels.includes(level)) {
    // Assume hot repeat data is stored in a specific format
    try {
      const filePath = path.join(__dirname, 'data', level, 'hotRepeat.json');
      const data = await fs.readFile(filePath, 'utf8');
      const hotRepeatData = JSON.parse(data);
      res.render('hotRepeat', { level: level, hotRepeat: hotRepeatData });
    } catch (error) {
      console.error(`Ошибка чтения файла горячих повторений: ${error}`);
      res.status(500).send('Ошибка сервера');
    }
  } else {
    res.status(404).send('Уровень не найден');
  }
}

app.get('/:level/:lesson', getLesson);
app.get('/:level/hot-repeat', getTranslationsHotRepeat);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
