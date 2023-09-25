const app = require("node:http");

const hostname = "::1";
const port = 4080;

const server = app.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  res.end("Running on wifi router enviornment!!!");
});

server.listen(port, hostname, () => {
  console.log(`App is running at http://${hostname}:${port}/`);
});
