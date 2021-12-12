const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    // res.send('Hello World!!');
    res.render('index', {title: 'My Express App', message: 'Hello'}); // index is the name of our view and in our case it is index.pug
});

module.exports = router;