let io;

function init(server) {
  io = require("socket.io")(server, { cors: { origin: "*" } });
}

function broadcastNew(items) {
  if (!io) return;
  items.forEach((it) => io.emit("nasa:new", it));
}

module.exports = { init, broadcastNew };
