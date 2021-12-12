const genres = require('./routes/genres');
const express = require('express');
const app = express();
const db = require('mongoose');

db.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to db...'))
    .catch(err => console.error('Could not connect to db..'));



app.use(express.json());

app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


