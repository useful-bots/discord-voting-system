const User = require("../database/Schemas/User");

async function Voidbots(req, res) {
  try {
    if (req.header("Authorization") !== process.env.VOIDBOTS_AUTH_TOKEN) {
      return res.sendStatus("401");
    }

    await User.findByIdAndUpdate(req.body.user, {
      $inc: { "wishes.voidbots": 1, "balance.coins": 1000 },
      "cooldowns.voidbots": Date.now(),
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.send({ error: "Unable to register vote!" });
  }
}

module.exports = (app) => app.post("/voidbots", Voidbots);
