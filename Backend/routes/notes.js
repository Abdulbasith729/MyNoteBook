const express = require('express');
const debug = require('debug')('app:notes'); // Specify a namespace for your debug messages
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route to fetch all notes for a user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    debug('Fetching all notes...');
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    debug(error); // Log error messages using debug
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new note for a user
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const { title, description } = req.body;
  try {
    debug('Adding a new note...');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newNote = new Note({
      title,
      description,
      user: req.user.id
    });

    const note = await newNote.save();
    res.json(note);
  } catch (error) {
    debug(error); // Log error messages using debug
    res.status(500).send('Internal Server Error');
  }
});

// Route to update an existing note for a user
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description } = req.body;
  const noteFields = {};
  if (title) noteFields.title = title;
  if (description) noteFields.description = description;
  try {
    debug('Updating a note...');
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });

    // Ensure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: noteFields },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    debug(error); // Log error messages using debug
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete an existing note for a user
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    debug('Deleting a note...');
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });

    // Ensure user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Note.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Note removed' });
  } catch (error) {
    debug(error); // Log error messages using debug
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
