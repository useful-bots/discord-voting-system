const express = require("express");
require("dotenv").config();
const app = express();

(async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get("/", (req, res) => res.status(200));

  await require("./database/main.js")();
  await require("./webhook.js")(app);

  await app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
  });
})();
