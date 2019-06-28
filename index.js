require("dotenv").config();
const server = require("./api/server");
const port = process.env.PORT || 8000;``
server.get("/", (req, res) => {
  res.send({ api: "is alive" });
});

server.use(require("./api/middleware/errorHandler"));

server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});