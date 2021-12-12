const express = require('express');
const Joi = require('joi');
const router = express.Router();
const db = require('mongoose');


const Genre = db.model('vidly', new db.Schema({
 // id: Number, // you can disregard as it is set by the database already
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  }
}));

// search
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// create
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// update
router.put('/:id', async (req, res) => {

  // below command: move on top because we have to validate the body.name before we attempt to update
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {new: true});
  
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// delete
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre);
}

module.exports = router;