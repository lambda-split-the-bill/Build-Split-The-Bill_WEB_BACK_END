require("dotenv").config();
const server = require("./api/server");
const port = process.env.PORT || 8000;``
server.get("/", (req, res) => {
  res.send("server is live!");
});

server.use(require("./api/middleware.js"));

server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});