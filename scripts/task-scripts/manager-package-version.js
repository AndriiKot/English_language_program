import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const packageJsonPath = path.join(process.cwd(), 'package.json');

try {
  const versionTag = execSync('git describe --tags --abbrev=0').toString().trim();

  if (!versionTag || !/^version_(\d+)_([\d]+)_([\d]+)$/.test(versionTag)) {
    console.error('Tag must be in the format version_X_Y_Z');
    process.exit(1);
  }

  const newVersion = versionTag.replace('version_', '').replace(/_/g, '.');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  if (packageJson.version !== newVersion) {
    console.log('!!!testing new version!!!');
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
    execSync('git add package.json');
    console.log(`\x1b[32m\n
Updated package.json version to ${newVersion}\n\x1b[0m`);
  } else {
    console.log('Version is already up to date.');
  }
} catch (error) {
  console.error('An error occurred:', error.message);
}
