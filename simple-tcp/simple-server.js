const net = require("node:net");

// it is a tcp server
const server = net.createServer((socket) => {
  console.log("Client connected");
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("App is running at http://127.0.0.1:8000/", server.address());
});
