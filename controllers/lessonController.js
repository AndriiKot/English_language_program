import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validLevels = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const isValidLesson = (lesson, startRang = 1, endRang = 50) => {
  const parsedLesson = parseInt(lesson);
  return (
    !isNaN(parsedLesson) && parsedLesson >= startRang && parsedLesson <= endRang
  );
};

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

export { getLesson, getTranslationsHotRepeat, getTranslations };
