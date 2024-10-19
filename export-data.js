const fs = require("node:fs");
const path = require("node:path");

const nameCopyFile = path.resolve(__dirname, process.argv[3]);
let addFile = process.argv[2];

try {
  if (!fs.existsSync(nameCopyFile)) {
    fs.writeFileSync(nameCopyFile, "{}");
    console.log(`Файл "${nameCopyFile}" успешно создан.`);
  }
} catch (err) {
  console.error(`Ошибка при создании файла "${nameCopyFile}":`, err);
}

try {
  if (!addFile) {
    console.error("Ошибка: Не указан файл для добавления данных.");
    return;
  }

  if (!fs.existsSync(`./${addFile}`)) {
    console.error(`Ошибка: Файл "${addFile}" не найден.`);
    return;
  }

  const addData = require(`./${addFile}`);
  const mainData = require(`${nameCopyFile}`);
  const newMainObj = { ...mainData, ...addData };

  try {
    fs.writeFileSync(nameCopyFile, JSON.stringify(newMainObj, null, 2));
    console.log(`Файл "${nameCopyFile}" успешно записан.`);
  } catch (err) {
    console.error(`Ошибка при записи файла "${nameCopyFile}":`, err);
  }
} catch (err) {
  console.error(`Ошибка при объеденении данных:`, err);
}
