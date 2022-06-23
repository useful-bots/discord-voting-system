const express = require("express");
require("dotenv").config();
const app = express();

(async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get("/", (req, res) => res.status(200)); // receive pings

  await require("./database/main.js")();
  await require("./webhooks/")(app);

  await app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
  });
})();
