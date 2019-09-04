const express = require("express")
const router = express.Router()
const userHandler = require("../handlers/users")

router.post("/signup", userHandler.signup);
router.post("/signin", userHandler.signin);
router.get("/signout", userHandler.signout )

module.exports = router
