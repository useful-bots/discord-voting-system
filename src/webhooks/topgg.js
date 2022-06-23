const User = require("../database/Schemas/User");

async function Topgg(req, res) {
  try {
    const password = req.headers.authorization;
    if (password !== process.env.TOPGG_AUTH_TOKEN) return res.sendStatus("401");

    const { user, isWeekend } = req.body;
    const wishes = isWeekend ? 2 : 1;
    const coins = isWeekend ? 2000 : 1000;

    await User.findByIdAndUpdate(user, {
      $inc: { "wishes.topgg": wishes, "balance.coins": coins },
      "cooldowns.topgg": Date.now(),
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.send({ error: "Unable to register vote!" });
  }
}

module.exports = (app) => app.post("/topgg", Topgg);
