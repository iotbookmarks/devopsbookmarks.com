const express = require('express');
const Nuxt = require('nuxt');
const staticAsset = require('static-asset');
const app = express();
const port = process.env.PORT || 3000;
const isProd = (process.env.NODE_ENV === 'production');

let config = require('./nuxt.config');
config.dev = !isProd;
const nuxt = new Nuxt(config);

app.use(require('morgan')('short'));
app.use(require('compression')());
app.use(staticAsset(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.get('/data/tools/sample', require('./routes/api').sample);
app.get('/data/tools', require('./routes/api').tools);
app.get('/data/dimensions', require('./routes/api').dimensions);

app.use(nuxt.render);

if (config.dev) {
  nuxt.build()
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

app.listen(port);
console.log('Listening on port ' + port);
