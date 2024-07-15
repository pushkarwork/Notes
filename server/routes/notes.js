var express = require('express');
var router = express.Router();
const notesController = require("../controllers/NoteCont")
const { getNotes, createNote, getNoteById, updateNote, deleteNote } = notesController
/* GET users listing. */


//Get all Notes
router.get('/notes', getNotes).get("/note/:id", getNoteById)
router.post("/newNote", createNote)
router.put("/Note/:id", updateNote).delete("/Note/:id", deleteNote)
module.exports = router;
