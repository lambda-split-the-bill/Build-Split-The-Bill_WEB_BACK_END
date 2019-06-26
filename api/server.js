const express = require("express");
const server = express();
const serverConfig = require("./serverConfig.js");
const authRoute = require("./routes/usersRouter");
const friendsRouter = require('./routes/friendsRouter');
const billsRouter = require('./routes/billsRouter');
const { protected } = require("./middleware/auth");

server.use(express.json());
serverConfig(server);

server.use("/api/auth", authRoute);
server.use("/api/friends", friendsRouter);
server.use("/api/bills", billsRouter);

module.exports = server;
