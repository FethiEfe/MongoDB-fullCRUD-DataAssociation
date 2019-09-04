const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    email: { type: String,
             required: true,
             unique: true},
    password: {type: String,
               required: true},
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
})

userSchema.pre("save", async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }catch(err){
        next(err)
    }
})

userSchema.methods.isValidPassword = function(candidatePassword, next){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){
            console.log(err)
        }
        next(null,isMatch)
    });

}

module.exports = mongoose.model("User", userSchema)