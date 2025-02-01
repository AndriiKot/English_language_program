import express from 'express';
import { getLesson, getTranslations, getTranslationsHotRepeat } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/:level', getLesson);
router.get('/:level/repeat', getTranslationsHotRepeat);
router.get('/:level/:lesson', getTranslations);

export default router;
