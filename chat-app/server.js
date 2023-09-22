const net = require("node:net");
const hostIP = "172.31.19.7";
const PORT = "6000";
const clients = []; // array of sockets
const server = net.createServer();
server.on("connection", (socket) => {
  // 'connection' listener
  let clientId = clients.length + 1;
  console.log(`Client connected with id ${clientId}`);
  socket.write(`id-${clientId}`);

  clients.map((client) => {
    client.socket.write(`User ${clientId} joined!`);
  });

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    clients.map((client) => {
      client.socket.write(`> User ${id}: ${message}`);
    });
  });

  // socket.on("close", () => {
  //   console.log(`Client disconnected with id ${clientId}`);
  // });
  socket.on("close", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });
  socket.on("error", () => {
    console.log("Connection was ended! Server disconnected!");
  });

  clients.push({ id: clientId, socket }); // collecting all the sockets.
});

server.on("close", () => {
  console.log("Server closed");
});
server.listen(PORT, hostIP, () => {
  console.log(`TCP is listening on http://${hostIP} net. server`);
  console.log(server.address());
});
