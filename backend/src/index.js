const express = require("express");
const http = require("http");
const config = require("./config");
const { pollOnce } = require("./poller");
const notifier = require("./notifier");

const app = express();
const server = http.createServer(app);
notifier.init(server);

app.get("/", (req, res) => res.send("NASA feed backend running"));

async function hourlyJob() {
  const sources = {
    EPIC: config.APIS.EPIC,
    DONKI: config.APIS.DONKI,
    NEOWS: config.APIS.NEOWS,
    EONET: config.APIS.EONET,
  };
  const newItems = await pollOnce(sources);
  if (newItems.length) notifier.broadcastNew(newItems);
}

setInterval(hourlyJob, config.POLL_INTERVAL_HOURS * 60 * 60 * 1000);
hourlyJob();

server.listen(config.PORT, () => console.log(`Listening ${config.PORT}`));
