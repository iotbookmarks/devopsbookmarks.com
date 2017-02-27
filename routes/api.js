const dataPromise = require('../data');
const _ = require('lodash');

function groupTagsByDimensions(tags, dimensions) {
  return _.mapValues(dimensions, d => {
    return Object.values(d)
      .filter(l => _.includes(tags, l.slug))
      .map(l => l.include_tags)
      .reduce((a, b) => a.concat(b), []);
  });
}

module.exports = {
  dimensions(req, res) {
    dataPromise
      .then(data => res.send(data.dimensions))
      .catch(error => res.status(500).send(error));
  },
  tools(req, res) {
    const tags = req.query.tags ? req.query.tags : [];

    dataPromise
      .then(data => {

        if (tags.length === 0) {
          res.send(data.tools);
          return;
        }

        const dimensionTags = groupTagsByDimensions(tags, data.dimensions);

        let tools = data.tools.filter(tool => {
          return _.every(dimensionTags, (values) => {
            return values.length === 0 || _.intersection(values, tool.tags).length > 0
          });
        });
        res.send(tools)
      })
      .catch(error => res.status(500).send(error));
  },
  sample(req, res) {
    dataPromise
      .then(data => {
        res.send(_.sample(data.tools));
      })
      .catch(error => res.status(500).send(error));
  }
};
