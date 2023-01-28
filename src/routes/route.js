const express = require('express');
const router = express.Router();





const { createUser,login, getUsers , updateUser ,deleteUser } = require("../controllers/Controller");




router.post("/create-user", createUser)
router.post("/login", login)
router.get("/get-user", getUsers)
router.put("/update-user", updateUser)
router.delete("/delete-user", deleteUser)




module.exports = router;