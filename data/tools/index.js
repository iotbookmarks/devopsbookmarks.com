const walk = require('walk');
const fs = require('fs');
const Q = require('q');

const walker = walk.walk(__dirname);
const deferred = Q.defer();
let data = [];

module.exports = deferred.promise;

walker.on('file', (root, fileStats, next) => {
  const match = fileStats.name.match(/(.*).json$/);
  if (!match) {
    next();
    return;
  }

  const toolName = match[1];
  data = data.concat(
    JSON.parse(
      fs.readFileSync(__dirname + `/${toolName}.json`)
    )
  );
  next();
});

walker.on('end', () => deferred.resolve(data));
