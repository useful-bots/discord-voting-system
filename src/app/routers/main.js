const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readdirSync(__dirname)
    .filter((file) => file !== "main.js")
    .forEach((file) => require(path.resolve(__dirname, file))(app));
};
