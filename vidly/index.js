const express = require('express')
const movie = require('./routes/movie');
const home = require('./routes/home');
const logger = require('./middleware/logger');
const db = require('mongoose');

db.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to db...'))
    .catch(err => console.err('Could connect to db..'));


const app = express();
app.set('view engine', 'pug'); // express will internally load pug with require method
app.set('views', './views'); // optional settings: if you want to overwrite the pass to template. But here ./views is already the default location. Just in case you want to put this somewhere else, here is the syntax.

app.use(express.json());
app.use(logger);
app.use('/api/movies', movie); // go to movie if user route from /api/movie
app.use('/', home);


// try using env variables
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))



