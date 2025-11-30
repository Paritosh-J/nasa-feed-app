const axios = require("axios");
const { withRetry } = require("./utils/retry");
const config = require("./config");
const cache = require("./cache");

async function fetchApi(url, params = {}) {
  params.api_key = config.NASA_API_KEY;
  return withRetry(() => axios.get(url, { params })).then((r) => r.data);
}

function normalize(item, source) {
  return {
    id: `${source}:${item.id || item.date || item.title}`,
    timestamp: item.date || item.timestamp || new Date().toISOString(),
    category: source,
    raw: item,
  };
}

async function pollOnce(sources) {
  const newItems = [];
  for (const [key, url] of Object.entries(sources)) {
    try {
      const data = await fetchApi(url);
      const list = Array.isArray(data) ? data : [data];
      for (const it of list) {
        const n = normalize(it, key);
        if (!cache.has(n.id)) {
          cache.set(n.id, true);
          newItems.push(n);
        }
      }
    } catch (e) {
      console.error("Poll error", key, e.message);
    }
  }
  return newItems;
}

module.exports = { pollOnce };
