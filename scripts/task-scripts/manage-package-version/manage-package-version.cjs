const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

// const scriptPath = './update-version.cjs';

// try {
//     const tagName = execSync('git describe --tags --abbrev=0').toString().trim();
//     if (!tagName) {
//         console.error('Теги не найдены!');
//         process.exit(1);
//     }

//     execSync(`node ${scriptPath} ${tagName}`, { stdio: 'inherit' });
// } catch (error) {
//     console.error(`Ошибка: ${error.message}`);
//     process.exit(1);
// }

const packageJsonPath = path.join(__dirname, '../../../package.json');
const versionTag = execSync('git describe --tags --abbrev=0').toString().trim();

console.log('versionTag', versionTag);
console.log('packageJsonPath', packageJsonPath);

if (!versionTag || !/^version_(\d+)_([\d]+)_([\d]+)$/.test(versionTag)) {
  console.error('Тег должен быть в формате version_X_Y_Z');
  process.exit(1);
}

const newVersion = versionTag.replace('version_', '').replace(/_/g, '.');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

console.log('newVersion', newVersion);
console.log('packageJson', packageJson.version);
console.log(!(packageJson.version === newVersion));

if (!(packageJson.version === newVersion)) {
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
  console.log(`Версия обновлена до ${newVersion}`);
}

console.log('post-tag done!');
