const express = require("express");
const path = require('path');
const db = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.static('./public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(db)
})

app.listen(PORT, () =>
console.log(`Literate-Journey listening at http://localhost:${PORT}/`))