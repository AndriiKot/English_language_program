const path = require('node:path');
const fs = require('node:fs/promises');

async function addPhrase(req, res) {
  const { phrase, translation } = req.body;
  // Логика добавления фразы
}

module.exports = {
  addPhrase,
};
