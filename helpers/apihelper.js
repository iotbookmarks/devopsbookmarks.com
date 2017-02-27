function httpBaseUrl() {
  let port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}

module.exports = {
  apiUrl(req, path) {
    const host = req ? httpBaseUrl() : '';
    return `${host}${path}`;
  }
};