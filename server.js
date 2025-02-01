import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import indexRoutes from './routes/index.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(path.resolve(), 'views')); 
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
