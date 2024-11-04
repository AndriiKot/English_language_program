require("dotenv").config();
const express = require("express");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/:level", (req, res) => {
  const level = req.params.level;

  const validLevels = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"];

  if (validLevels.includes(level)) {
    res.render("lessons", { level: level });
  } else {
    res.status(404).send("Уровень не найден");
  }
});

app.get("/:lesson", (req, res) => {
  // const { level, lesson } = req.params;

  // if (validLevels.includes(level)) {
  //   res.render("lesson", { level, lesson }); // Убедитесь, что `lesson.pug` существует
  // } else {
  //   res.status(404).send("Урок не найден");
  // }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
