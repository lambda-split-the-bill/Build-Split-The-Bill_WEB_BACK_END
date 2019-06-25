const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");
const authRoute = require("./routes/usersRouter");
const { protected } = require("./middleware/auth");

server.use(express.json());
serverConfig(server);

server.use("/api/auth", authRoute);


module.exports = server;
