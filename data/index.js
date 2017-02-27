const dimensionsPromise = require('./dimensions');
const toolsPromise = require('./tools');
const Q = require('q');

const deferred = Q.defer();
module.exports = deferred.promise;

Q.all([dimensionsPromise, toolsPromise])
  .then(resolvedValues => deferred.resolve({ dimensions: resolvedValues[0], tools: resolvedValues[1] }))
  .catch(e => deferred.reject(e));