const net = require("node:net");
// we can create a socket connection using net.createConnection on any
// tcp connected port out there.
const socket = net.createConnection({ host: "127.0.0.1", port: 8000 }, () => {
  socket.write("A simple message coming from simple sender!!");
});
