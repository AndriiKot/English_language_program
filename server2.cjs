require('dotenv').config();
const express = require('express');
const path = require('node:path');
const fs = require('node:fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const validLevels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const isValidLesson = (lesson, startRang = 1, endRang = 50) => {
  const parsedLesson = parseInt(lesson);
  let flag;
  if (isNaN(parsedLesson)) {
    flag = false;
  } else {
    flag = parsedLesson >= startRang && parsedLesson <= endRang;
  }
  return flag;
};

async function getTranslationsHotRepeat() {
  try {
    const filePath = path.join(
      __dirname,
      'data',
      'hot-repeat',
      `hot-repeat.json`,
    );
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Ошибка чтения файла: ${error}`);
    return {};
  }
}

app.get('/hot-repeat', async (req, res) => {
  try {
    const translations = await getTranslationsHotRepeat();

    if (Object.keys(translations).length === 0) {
      res.render('empty-lesson');
    } else {
      res.render('card-hot-repeat', {
        level: 'hot-repeat',
        lesson: 'repeat',
        translations: translations,
      });
    }
  } catch (error) {
    console.error(`Ошибка при получении переводов: ${error}`);
    res.status(500).send('Ошибка сервера');
  }
});

app.get('/:level', (req, res) => {
  const level = req.params.level;

  if (validLevels.includes(level)) {
    res.render('lessons', { level: level });
  } else {
    res.status(404).send('Уровень не найден');
  }
});

async function getTranslations(level, lesson) {
  try {
    const filePath = path.join(
      __dirname,
      'data',
      level,
      `${level}-L${lesson}.json`,
    );
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Ошибка чтения файла: ${error}`);
    return {};
  }
}

app.get('/:level/repeat', async (req, res) => {
  const { level } = req.params;

  const translations = await getTranslations(level, 'repeat');

  if (Object.keys(translations).length === 0) {
    res.render('developing-lesson');
  } else {
    res.render('card-repeat', {
      level: level,
      lesson: 'repeat',
      translations: translations,
    });
  }
});

app.get('/:level/:lesson', async (req, res) => {
  const { level, lesson } = req.params;

  if (validLevels.includes(level)) {
    if (isValidLesson(lesson)) {
      const translations = await getTranslations(level, lesson);
      if (Object.keys(translations).length === 0) {
        res.render('developing-lesson');
      } else {
        res.render('card-lesson', {
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
});

app.post('/api/add-phrase', async (req, res) => {
  const { phrase, translation } = req.body;
  console.log(phrase, translation);

  const filePath = path.join(__dirname, 'data/A0/A0-Lrepeat.json');

  try {
    const data = await fs.readFile(filePath, 'utf-8');

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (jsonErr) {
      return res.status(500).send(`Error parsing JSON ${jsonErr}`);
    }

    jsonData[phrase] = translation;

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    res.status(200).send('Phrase added successfully');
  } catch (err) {
    console.error(`Ошибка чтения файла: ${err}`);
    res.status(500).send('Error reading file');
  }
});
//

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
