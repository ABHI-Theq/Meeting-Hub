const express = require("express");
const cors = require("cors");
const { ExpressPeerServer } = require("peer");

const PORT = process.env.PORT || 9000;
const app = express();

// Enable CORS if needed (for frontend running on a different domain)
app.use(cors(
    {
        origin: "*", // Allow all origins, adjust as needed for security
        methods: ["GET", "POST"]
    }
));

// Create an HTTP server
const server = app.listen(PORT, () => {
  console.log(`✅ PeerJS server is running on http://localhost:${PORT}`);
});

// Attach the PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/myapp", // optional, for custom path like /peerjs/myapp
  allow_discovery: true,
});

app.use("/peerjs", peerServer);

// Optional health check route
app.get("/", (req, res) => {
  res.send("🎉 PeerJS Signaling Server is running!");
});
