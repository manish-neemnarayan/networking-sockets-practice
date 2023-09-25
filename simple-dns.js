const dns = require("node:dns/promises");

const hostname = "google.com";

(async () => {
  const res = await dns.lookup(hostname);
  console.log(res);
})();
