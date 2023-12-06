const express = require("express");
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = 3001;

// the json middleware will parse the request body as a json
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('./public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(db)
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    
});

app.listen(PORT, () =>
console.log(`Literate-Journey listening at http://localhost:${PORT}/`))

// const newNote = {
//     title: noteTitle.value,
//     text: noteText.value
//   };

// Code borrowed from activity 18
// Immediately export a function that generates a string of random numbers and letters.
const uuid = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

