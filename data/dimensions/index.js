const _ = require('lodash');
const walk = require('walk');
const fs = require('fs');
const Q = require('q');

const walker = walk.walk(__dirname);
const deferred = Q.defer();
const data = {};

module.exports = deferred.promise;

function normalizeTags(dimentionItem) {
  dimentionItem.include_tags = dimentionItem.include_tags ? dimentionItem.include_tags : [dimentionItem.slug];
  return dimentionItem;
}

walker.on('file', (root, fileStats, next) => {
  const match = fileStats.name.match(/(.*).json$/);
  if (!match) {
    next();
    return;
  }

  const dimensionName = match[1];
  const contents = JSON.parse(fs.readFileSync(__dirname + `/${dimensionName}.json`))
    .map(normalizeTags);
  data[dimensionName] = _.keyBy(contents, 'slug');
  next();
});

walker.on('end', () => deferred.resolve(data));
