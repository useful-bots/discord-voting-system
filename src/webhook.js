const User = require("./database/Schemas/User");
const { Webhook } = require("@top-gg/sdk");
const { Router } = require("express");

const wh = new Webhook(process.env.webhookToken);
const router = Router();

const req = wh.listener(async (vote) => {
  await User.findByIdAndUpdate(vote.user.user, {
    $inc: { "wishes.topgg": 1, "balance.coins": 10000 },
    "cooldowns.togg": Date.now(),
  });
});

router.post("/webhook", req);

module.exports = (app) => app.use("/", router);
