const throng = require('throng');

throng({
  workers:  process.env.WEB_CONCURRENCY || require('os').cpus().length,
  lifetime: Infinity
}, (id) => {
  console.log(`Starting worker: ${id}`);
  require('./server');
});