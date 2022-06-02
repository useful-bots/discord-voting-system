const { Router } = require("express");
const User = require("../../database/Schemas/User");
const router = Router();

const { Webhook } = require("@top-gg/sdk");
const wh = new Webhook(process.env.webhookToken);

const req = wh.listener(async (vote) => {
  await User.findByIdAndUpdate(vote.user.user, {
    $inc: { "wishes.topgg": 1 },
    "cooldowns.togg": Date.now(),
  });
});

router.post("/", req);

module.exports = (app) => app.use("/webhook", router);
