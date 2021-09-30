const dbConfig = require("./../config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./userModel.js")(mongoose);
db.posts = require("./PostsModel.js")(mongoose);



module.exports = db;