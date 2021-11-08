const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1: get the notes GET: "api/notes/fetchnotes" FOR geting notes.
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

//ROUTE 2: add the notes POST: "api/notes/addnotes" FOR adding notes.
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must have minimum 5 character').isLength({ min: 5 }),
], async (req, res) => {
    // if there are error, return bad request, error   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { title, description, tag } = req.body;

        const notesData = await Notes.create({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag,
        })
        res.json(notesData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 3: update an existing note PUT: "api/notes/updatenotes" FOR updating notes.
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {


        let { title, description, tag } = req.body;
        //create a new note for update
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //find the note to be update and update it 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found ");
        }
        //check the user is update his own notes 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed ");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");

    }
})

//ROUTE 4: Delete an existing note PUT: "api/notes/deletenotes" FOR updating notes.
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be Delete and Delete it 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found ");
        }
        //check the user is Delete his own notes 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed ");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ Success: "Current note is deleted successfully", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;
