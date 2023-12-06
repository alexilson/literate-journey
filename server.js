const express = require("express");
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid')

const app = express();
const PORT = process.env.PORT || 3001;

// the json middleware will parse the request body as a json
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('./public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            res.json(parsedNotes);
        }
    })
});

app.post('/api/notes', (req, res) => {
    
    const { title, text } = req.body;

    const newNote = {
        id: uuid(),
        title: title,
        text: text
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(newNote);

            fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedNotes, null, 4),
                (err) => {
                if (err) {
                    console.error(err)
                } else {
                    res.sendFile(path.join(__dirname, '/public/notes.html'))
                }
            });
        }
    })
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    if (noteId) {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                const indexToRemove = parsedNotes.findIndex(note => note.id === noteId)

                if (indexToRemove !== -1) {
                    parsedNotes.splice(indexToRemove, 1);
                    res.sendFile(path.join(__dirname, '/public/notes.html'));
                }

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        res.sendFile(path.join(__dirname, '/public/notes.html'))
                    }
                });
            }
        })
    }
});

app.listen(PORT, () =>
console.log(`Literate-Journey listening at http://localhost:${PORT}/`))
