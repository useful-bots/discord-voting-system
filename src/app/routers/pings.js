const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send({ uptime: Math.floor(process.uptime()) });
});

module.exports = (app) => app.use("/pings", router);
