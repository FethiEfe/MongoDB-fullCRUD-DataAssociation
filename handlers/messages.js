const db = require("../models")
module.exports = {
    get_my_messages : async (req,res) => {
        
        db.User.findById(req.params.user_id).populate("messages").exec((err,data) => {
            if(err){
                console.log("problem")
            }else{
                res.status(200).json(data.messages)
            }
        })
       
    },

    create_one : async (req,res) => {
        const newMessage = {
            text : req.body.text,
            author : req.params.user_id
        }

        db.Message.create(newMessage)
        .then(message => {
            db.User.findById(req.params.user_id)
            .then(user => { 
                user.messages.push(message.id)
                user.save()
                .then(() => res.status(200).json("Message created"))
                .catch(() => console.log("Could not save message"))
                
            })
            .catch(() => console.log("User doesn't exist"))
        })
        .catch(() => console.log("message couldn't be saved"))
    },
    update_one : async (req,res) => {
        const {user_id, message_id} = req.params;
        const {text} = req.body
        db.Message.findByIdAndUpdate(message_id, {$set: {text}}, {new: true})
        .then(message => console.log(message))
        .catch(err => console.log(err))
    },
    delete_one : async (req,res) => {
        const {user_id, message_id} = req.params;
        let foundMessage = await db.Message.findById(message_id);
        await foundMessage.remove();
       res.status(200).json("message was removed")
       
    }

}