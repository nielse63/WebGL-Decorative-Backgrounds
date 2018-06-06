const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { spawnSync } = require('child_process');

const packagesDir = path.resolve(__dirname, '../packages');
fs.readdirSync(packagesDir)
  .map(dir => path.join(packagesDir, dir))
  .filter((absdir) => {
    const stat = fs.statSync(absdir);
    return stat.isDirectory();
  })
  .filter((absdir) => {
    const yarnLockPath = path.join(absdir, 'yarn.lock');
    return fs.existsSync(yarnLockPath);
  })
  .map((absdir) => { // ensure yarn.lock is up to date
    const basename = path.basename(absdir);
    console.log(chalk.cyan(`${basename}:`), 'Updating lockfile');
    spawnSync('yarn', ['install', '--cwd', absdir]);
    return absdir;
  })
  .forEach((absdir) => { // check for outdated packages
    const basename = path.basename(absdir);
    console.log(chalk.cyan(`${basename}:`), 'Checking for outdated node modules');
    spawnSync('yarn', ['outdated', '--cwd', absdir], { stdio: 'inherit' });
  });
