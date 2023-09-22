const net = require("node:net");
const readline = require("readline/promises");
const hostIP = "51.20.44.251";
const PORT = "6000";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;
const socket = net.createConnection({ host: hostIP, port: PORT }, async () => {
  const ask = async () => {
    const message = await rl.question("Enter a message > ");
    await moveCursor(0, -1); // move the cursor one line up
    await clearLine(0); // clear the current line where the cursor is in console before writing to socket
    socket.write(`${id}-message-${message}`);
  };

  ask();

  socket.on("data", async (data) => {
    console.log(); // log an empty line
    await moveCursor(0, -1);
    await clearLine(0);

    if (data.toString("utf-8").substring(0, 2) == "id") {
      // when we are getting id .....
      id = data.toString("utf-8").substring(3); // get everything from the thrird character up until end
      console.log(`Your id is ${id}!\n`);
    } else {
      // when we are getting a message
      console.log(data.toString("utf-8"));
    }

    ask();
  });

  socket.on("error", () =>
    console.log("Connection was ended! Client disconnected!")
  );
});
