const { connect } = require("mongoose");

module.exports = async () => {
  const tokenData = process.env.tokenData;

  if (!tokenData) {
    throw new Error("Please insert the tokenData variable into the .env file");
  } else await connect(tokenData);

  console.log("Connected to database");
};
