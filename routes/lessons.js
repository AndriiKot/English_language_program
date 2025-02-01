const express = require('express');
const { getLesson, getTranslations, getTranslationsHotRepeat } = require('../controllers/lessonController');
const router = express.Router();

router.get('/:level', getLesson);
router.get('/:level/repeat', getTranslations);
router.get('/:level/:lesson', getTranslations);

module.exports = router;
