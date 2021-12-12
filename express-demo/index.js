const express = require('express');
const startupDebugger = require('debug')('app:startup'); // global env DEBUG
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const app = express();

app.set('view engine', 'pug'); // express will internally load pug with require method
app.set('views', './views'); // optional settings

// Environments
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // global env NODE_ENV
// console.log(`APP: ${app.get('env')}`);

// MIDDLEWARE
app.use(express.json()); //json middleware. Parses the body of the request and if theres a json object, it will populate the req.body
app.use(express.urlencoded({extended: true })); // we can use url using this middleware, and many more like arrays if we add an object extended: true
app.use(express.static('public')); // we can serve static conCtent using this middleware
app.use(helmet());

// CONFIGURATION
// so we can define which config to use(development, testing, production)
// settings for this middleware are defined using global "NODE_ENV" variable
console.log(`APP: ${app.get('env')}`);
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));
// store password in environment variable and read them using config module
// create a file custom-environment-variables.json // here we store the mapping of our config to global env variable app_password
 

if (app.get('env') === 'development'){
    app.use(morgan('tiny')); // for logging, tiny for logging short details
    // console.log('Morgan enabled...');
    startupDebugger('Morgan enabled...')
}


// DB work...
dbDebugger('Connected to the database...');

// note: prefer debug module vs console.log when debugging


// set the environment to production
// export NODE_ENV=production

// custom middleware
app.use(logger);

// middleware 
app.use(function(req, res, next){
    console.log('Authentication...');
    next();
});

const courses = [
    {id: 1, title: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
];

app.get('/', (req, res) => {
    // res.send('Hello World!!');
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

// ROUTE PARAMETERS
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    // res.send(`got the id ${req.params.id} from /courses`)
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The given id was not found.') // 404 - file did not exists
    res.send(course);
})

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params); // stored in an object with key value pairs. Try by adding '?sortBy=name' at the end
});

// HANDLING HTTP POST REQUESTS
// to create data
app.post('/api/courses', (req,res) => {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     const result = Joi.validate(req.body, schema);
//     // console.log(result); check to see what we can get so we can also modify our validation if statement

//     if(result.error) {
//         res.status(400).send(result.error.details[0].message)
//         return;
//    };
// from above command we can use below instead
const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message); // 400 - error in request


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// HANDLING HTTP PUT REQUESTS
// to update data
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The given id was not found.')
    
    // Validate
    // If invalid, return 400 - Bad request
   
    // object destruction example
    //  const result = validateCourse(req.body) 
    const { error } = validateCourse(req.body) // result.error
    

    if(error) {
        res.status(400).send(error.details[0].message)
        return;
   };

    // Update course
    // Return updated course
    course.name = req.body.name;
    res.send(course)
});

// HANDLING HTTP DELETE REQUEST
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, retun 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The given id was not found.');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1); //delete part

    // Return the same course
    res.send(course);
});


// VALIDATION REFACTORING
function validateCourse(courseBody) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(courseBody, schema);
    
}

// we use route parameters for essentials or route values. using :
// we use query string parameters to provide additional data for a backend services and anything that is optional. using ?

// ENVIRONMENT VARIABLES

//PORT
//In real world most of the time the value of port is set by the host. We don't know yet the port.
// In that case, we have to look for environment variables named PORT or whatever it is.
// We have to define it using below. The line below will use port 3000 if there is no
// port assisgn to environment variable port.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



