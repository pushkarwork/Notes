var express = require('express');
var router = express.Router();

const { createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser } = require("../controllers/userCont")
/* GET users listing. */
router.get('/users', getUsers);    //----ADMIN ROUTE
router.get("/user/:id", getUserById)
router.post("/newUser", createUser)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)

module.exports = router;
