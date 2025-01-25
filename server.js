require('dotenv').config();
const express = require('express');
const path = require('node:path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const indexRoutes = require('./routes/index');
const lessonRoutes = require('./routes/lessons');
const apiRoutes = require('./routes/api');

app.use('/', indexRoutes);
app.use('/lessons', lessonRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
