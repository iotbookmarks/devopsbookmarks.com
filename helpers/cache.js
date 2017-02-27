let store = {};

function computeAndStore(key, block, context) {
  let value = block.call(context);
  store[key] = value;
  return value;
}

module.exports = {
  get(key, block, context) {
    return store[key] || computeAndStore(key, block, context);
  }
};
