const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withRetry(fn, attempts = 5, base = 500) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      const jitter = Math.random() * 300;
      await sleep(base * Math.pow(2, i) + jitter);
    }
  }
}

module.exports = { withRetry };
