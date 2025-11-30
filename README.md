/nasa-feed-app
├─ /frontend
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ feeds/
│  │  └─ sockets.js
│  └─ package.json
├─ /backend
│  ├─ src/
│  │  ├─ index.js        # Express/Fastify + WebSocket server
│  │  ├─ poller.js       # Polling orchestration
│  │  ├─ cache.js        # in-memory cache
│  │  └─ notifier.js     # push logic
│  └─ package.json
├─ infra/
│  ├─ lambda.yml         # Lambda + EventBridge config
│  └─ iam-policies.yml
└─ README.md