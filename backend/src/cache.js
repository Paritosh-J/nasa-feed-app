const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

module.exports = {
  get: (k) => cache.get(k),
  set: (k, v, ttl) => cache.set(k, v, ttl),
  has: (k) => cache.has(k),
};
