const express = require("express");
const app = express();

(async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  await require("./database/main.js");
  await require("./app/routers/main.js")(app);

  await app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
  });
})();
