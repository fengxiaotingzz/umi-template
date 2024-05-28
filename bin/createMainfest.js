const fs = require('fs');
const path = require('path');
const semver = require('semver');

function getMainfestVersion(filePath) {
  const { version } = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return version;
}

function updateMainfest({ version, filePath }) {
  const newVersion = semver.inc(version, 'patch');
  fs.writeFileSync(filePath, JSON.stringify({ version: newVersion }));
}

function create() {
  const filePath = path.resolve('./public/mainfest.json');
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      const version = '0.0.0';
      fs.appendFile(filePath, JSON.stringify({ version }), (e) => {
        if (e) {
          throw e;
        } else {
          updateMainfest({ version, filePath });
        }
      });
    } else {
      const version = getMainfestVersion(filePath);
      updateMainfest({ version, filePath });
    }
  });
}

create();
