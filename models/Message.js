const mongoose = require("mongoose");
const User = require("./User")

const messageSchema = new mongoose.Schema({
    text : String,
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

messageSchema.pre("remove", { query: true }, async function(next){
    
    User.findById(this.author).then(user => {
        user.messages.remove(this._id);
        user.save();
        next()
    })
    .catch(() => console.log("message couldn't be deleted at user schema"))
})

module.exports = mongoose.model("Message", messageSchema)