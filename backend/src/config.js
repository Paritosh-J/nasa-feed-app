module.exports = {
  PORT: process.env.PORT || 4000,
  NASA_API_KEY: process.env.NASA_API_KEY || "DEMO_KEY",
  POLL_INTERVAL_HOURS: 1,
  APIS: {
    EPIC: "https://api.nasa.gov/EPIC/api/natural",
    DONKI: "https://api.nasa.gov/DONKI/notifications",
    NEOWS: "https://api.nasa.gov/neo/rest/v1/feed",
    EONET: "https://eonet.gsfc.nasa.gov/api/v3/events",
    APOD: "https://api.nasa.gov/planetary/apod",
  },
};
