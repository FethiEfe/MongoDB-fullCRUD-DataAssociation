const express =  require("express");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes")
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(session({
    secret: "JS is weird",
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24
    }
}))

isLoggedIn = (req, res,next) => {
    if(!req.session.user){
       res.status(401).json("You are not logged in")
    }else{
        if(req.params.user_id === req.session.user.id){
            next()
        }else{
            res.status(401).json("Not Authenticated")
        }
    }

}

app.use("/user", userRoutes);
app.use("/user/:user_id/message",isLoggedIn, messageRoutes)



app.listen(4000, () => {
    console.log(" I am listening  on port 4000")
}) 