const express = require('express');
const router = express.Router();

function log(req, res, next) {
    console.log('Logging..')
    next();
}

module.exports = log