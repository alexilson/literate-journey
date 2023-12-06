const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.listen(PORT, () =>
console.log(`Literate-Journey listening at http://localhost:${PORT}/`))