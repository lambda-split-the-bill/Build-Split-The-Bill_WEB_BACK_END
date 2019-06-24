const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");
const authRoute = require("./routes/usersRoute");
const { protected } = require("./middleware/auth");
serverConfig(server);

server.use("/api/auth", authRoute);

module.exports = server;
