const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mongo-auth", {useNewUrlParser:true})


module.exports.User = require("./User");
module.exports.Message = require("./Message")