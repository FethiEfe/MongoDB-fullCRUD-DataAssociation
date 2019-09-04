const db = require("../models/index");

module.exports = {
    signup : async (req,res,next) => {
        const isUserExist = await db.User.findOne({email:req.body.email})
        if(isUserExist){
            res.status(403).json({message:"User already exists"})
        }else{
            db.User.create(req.body)
            .then((user) => {
                req.session.user = {
                    email: user.email,
                    id : user._id
                }
                res.status(200).json(req.session.user)
            }
            )
            .catch( err => {
                console.log(err)
            })
        }
    },
    signin : async(req,res,next) => {
    
        db.User.findOne({email: req.body.email})
        .then(user => {
            user.isValidPassword(req.body.password, (err, isMatch) => {
                if(isMatch){
                    req.session.user = {
                        email: user.email,
                        id : user._id
                    }
                    res.status(200).json(req.session.user)
                }else{
                    res.status(400).json({message: "Invalid email/password"})
                }
            })
        })
        .catch((err) => {
            res.status(400).json({message: "User doesn't exist. Please sign up"})

        })
    },
    signout: async (req,res,next) => {
        req.session.destroy();
        res.status(200).json(req.session)
    }
}