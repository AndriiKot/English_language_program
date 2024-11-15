const fs = require('node:fs');
const path = require('node:path');

const packageJsonPath = path.join(__dirname, 'package.json');
const versionTag = process.argv[2];

if (!versionTag || !/^version_(\d+)_([\d]+)_([\d]+)$/.test(versionTag)) {
  console.error('Тег должен быть в формате version_X_Y_Z');
  process.exit(1);
}

const newVersion = versionTag.replace('version_', '').replace(/_/g, '.');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.version = newVersion;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');

console.log(`Версия обновлена до ${newVersion}`);
