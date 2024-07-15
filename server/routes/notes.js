var express = require('express');
var router = express.Router();
const notesController = require("../controllers/NoteCont");
const authenticateUser = require('../middleware/authMiddle');
const { getNotes, createNote, getNoteById, updateNote, deleteNote,getNotesByUser } = notesController
/* GET users listing. */


//Get all Notes
router.get('/notes', getNotes).get("/note/:id", getNoteById)
router.post("/newNote", authenticateUser, createNote)
router.put("/Note/:id", updateNote).delete("/Note/:id", deleteNote)
router.get("/user", authenticateUser, getNotesByUser)
module.exports = router;
