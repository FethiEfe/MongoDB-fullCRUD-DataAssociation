const express = require("express");
const router  = express.Router({mergeParams:true});
const messageHandler = require("../handlers/messages")

router.get("/", messageHandler.get_my_messages);
router.post("/", messageHandler.create_one);
router.delete("/:message_id", messageHandler.delete_one)
router.put("/:message_id", messageHandler.update_one)

module.exports = router