// we want to raise an event
const EventEmitter = require('events');


// sample url
var url = 'http://mylogger.io/log'

class Logger extends EventEmitter {
        log(message) {
            // Send an HTTP request
            console.log('This is from logger module: ' + message);

            this.emit('loggerError', {
                id: 1,
                url: 'http://'
            });
        }
    }

module.exports = Logger; // exporting a class Logger

// adding a method called log to exports object and set it up to log function we defined
// module.exports.log = log;  
// this will return an object with a log function

// when we want to call our url variable to endPoint
// module.exports.endPoint = url; // but we will not do this because this is implementation detail

// For other module to use this module you must export it first
// instead of exporting an object from this module
// we can also export just a single function
// module.exports = log; // this will return a log function itself


// Module wrapper function
// exports = module.exports // you cannot changed the value of exports like exports = log
// we can define exports.log = log as it is equivalent to module.exports.log = log
// __filename refers to the location of the current filename
// __dirname refers to the location of the current's file parent directory


