var express = require('express');
var router = express.Router();

const { createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser, loginUser,
  dashboard, 
  logout} = require("../controllers/userCont");
const authenticateUser = require('../middleware/authMiddle');
/* GET users listing. */
router.get('/users', getUsers);    //----ADMIN ROUTE
router.get("/user/:id", getUserById)
router.post("/newUser", createUser)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)
router.post('/login', loginUser)
router.get("/dashboard", authenticateUser, dashboard)
router.get("/logout",authenticateUser,logout)

module.exports = router;
