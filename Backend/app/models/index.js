const dbConfig = require("../config/db.config.js");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.url = dbConfig.url;
db.Books = require("./books.model")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;