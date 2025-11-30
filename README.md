### Project Overview
A lightweight real‑time webapp that polls selected NASA APIs and pushes **only new, interesting** items to connected clients. The backend centralizes polling, enforces rate‑limit safeguards, deduplicates results in memory, and broadcasts updates via WebSockets so the frontend can display a live feed without storing images or large blobs.

---

### Key Features
- **Centralized polling** of NASA endpoints (EPIC, DONKI, NeoWs, EONET, APOD, Mars Weather, Image/Video Library).  
- **Real‑time delivery** using WebSockets (socket.io) or SSE.  
- **In‑memory deduplication** and TTL cache to avoid redundant requests.  
- **Retry with exponential backoff and jitter** for transient failures.  
- **Minimal storage** approach — no images or large payloads persisted.  
- **Secure secret handling** recommended via a secrets manager in production.  

---

### Architecture Summary
- **Scheduler** triggers hourly and daily jobs (server cron or serverless scheduler).  
- **Poller** fetches APIs, normalizes responses to a common schema (`id`, `timestamp`, `category`, `content`), filters new items, and enriches metadata.  
- **Cache** (in‑process LRU/TTL) prevents duplicate broadcasts within the polling window.  
- **Notifier** pushes new items to clients via WebSockets or SSE.  
- **Monitoring** collects metrics for requests, errors, and rate‑limit responses; logs raw responses for debugging.

---

### Tech Stack
- **Backend**: Node.js + Express or Fastify.  
- **Realtime**: socket.io (WebSockets) or Server‑Sent Events.  
- **HTTP client**: Axios.  
- **In‑memory cache**: node-cache or quick-lru.  
- **Scheduler**: server cron or serverless scheduled functions (AWS EventBridge → Lambda recommended).  
- **Secrets**: AWS Secrets Manager, Google Secret Manager, or GitHub Secrets for CI.  
- **Observability**: Prometheus + Grafana or Datadog; Sentry for error tracking.  
- **CI/CD**: GitHub Actions; deploy backend to Render, Heroku, AWS, or serverless.

---

### Quick Start
1. **Clone repository** and open the backend folder.  
2. **Install dependencies**:
```bash
cd backend
npm install
```
3. **Set environment variables** (example):
```env
PORT=4000
NASA_API_KEY=YOUR_NASA_API_KEY
POLL_INTERVAL_HOURS=1
```
4. **Run locally**:
```bash
npm run dev
# or
npm start
```
5. **Test with a simple client**: open a small HTML page that connects to `ws://localhost:4000` and listens for `nasa:new` events.

---

### Environment Variables
- **PORT** — server port (default 4000).  
- **NASA_API_KEY** — your NASA API key (use Secrets Manager in production).  
- **POLL_INTERVAL_HOURS** — polling cadence for hourly feeds.  
- **LOG_LEVEL** — optional, for controlling verbosity.

---

### Production Considerations
- **Scheduler**: use AWS Lambda + EventBridge for reliable scheduled execution and tight IAM controls; Google Cloud Scheduler + Cloud Functions is a solid alternative.  
- **Secrets**: never store API keys in source control; use a managed secrets store and grant least privilege.  
- **Rate limits**: centralize polling to control request volume; implement exponential backoff with jitter and request coalescing.  
- **Scaling**: run a single poller instance or coordinate via leader election to avoid duplicate polling. Use a managed WebSocket service or sticky sessions if horizontally scaling the notifier.  
- **Security**: enforce HTTPS, strict CORS, and rotate keys regularly.

---

### Monitoring and Alerts
- Emit metrics for **requests**, **429 responses**, **error rates**, and **latency**.  
- Alert on repeated 429s, high error rates, or scheduler failures.  
- Store raw API responses temporarily for debugging and then purge.

---

### Development Tips
- Use a short poll interval locally for faster iteration, then restore to hourly for production.  
- Broadcast only when `id + timestamp` is new to reduce client churn.  
- Keep payloads small: send metadata and URLs rather than large media.  
- Add feature flags for experimental feeds.

---

### Troubleshooting
- **No events**: verify `NASA_API_KEY`, check backend logs for 4xx/5xx responses, and confirm scheduler is running.  
- **Socket connection issues**: confirm CORS, correct origin, and that the server is reachable on the expected port.  
- **Rate limit errors**: back off, add jitter, and reduce polling frequency or aggregate requests.

---

### Project Layout
```
/backend
├─ package.json
├─ src/
│  ├─ index.js        # server + scheduler bootstrap
│  ├─ config.js       # env and API endpoints
│  ├─ cache.js        # in-memory TTL cache
│  ├─ poller.js       # API fetch + normalize + dedupe
│  ├─ notifier.js     # WebSocket/SSE broadcaster
│  └─ utils/retry.js  # exponential backoff helper
```

---

### License and Attribution
- **License**: choose an appropriate open source license for your project (MIT recommended for prototypes).  
- **Data**: this project consumes NASA public APIs; follow NASA’s terms of use and attribution requirements when displaying content.

---

I can generate the **AWS Lambda + EventBridge manifest and a GitHub Actions workflow** to deploy the poller serverlessly so you can run scheduled jobs securely and at scale.
