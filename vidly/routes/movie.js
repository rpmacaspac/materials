const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('mongoose');

const Movies = db.model('movies', new db.Schema({
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 20
        },
        genre: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 20
        }
}));


// const movies = [
//     { id: 1, title : "Terminator", genre : "Action"},
//     { id: 2, title : "Alice In Wonderland", genre : "Fantasy"},
//     { id: 3, title : "Dear John", genre : "Drama"}
// ];

// get
router.get('/', async (req,res) => {
    const movies = await Movies.find();
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movies.find(req.params.id);
    // const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Id was not found.');
    res.send(movie);

});
// create
router.post('/', async (req,res) => {


    const { error } = validationError(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    let movie = new Movies({
        title: req.body.title,
        genre: req.body.genre
    });
    movie = await movie.save();

    // const movie = {
    //     id: movies.length + 1,
    //     title: req.body.title, // in order for this line to work. you have to enable express.json() by adding at the top - app.use(express.json())
    //     genre: req.body.genre
    // };

    // movies.push(movie);
    res.send(movie);
});

// update
router.put('/:id', async (req, res) => {

    const { error } = validationError(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movies.findByIdAndUpdate(req.params.id, {
        $set: {
            genre: req.body.genre,
            title: req.body.title
        }
    }, {new: true});

    
    if (!movie) return res.status(404).send("Id was not found.")
    
    res.send(movie);
})

// delete
router.delete('/:id', async (req,res) => {

    const movie = await Movies.findByIdAndRemove(req.params.id);
    
    if (!movie) return res.status(404).send("Id was not found.");

    res.send(movie);
});


// Validation
function validationError(obj){
    const schema = Joi.object({
        title: Joi.string().required(),
        genre: Joi.string().required()
    });
    
    return schema.validate(obj);
    
}

module.exports = router;