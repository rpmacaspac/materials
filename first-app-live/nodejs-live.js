// welcome NODE JS
// function sayHello(name) {
//     console.log('Hello ' + name)
// }

// sayHello('Rolem')

// // GLOBAL OBJECTS

// // below function belong to window object
// setTimeout()
// clearTimeout()
// setInterval()
// clearInterval()

// // In browsers we have window object
// // so all variables we defined can be access via window object
// var message = 'a';
// window.message
// window.setTimeout();

// // BUT in nodeJS we have global object in which what we defined in this js file, will not be available globally
// console.log(global.message) // resulted to undefined 


// // MODULES
// To avoid two variable overriding each other, use small building blocks or modules
// in node every file is a module. The variable and function defined on that module are on that module scope and not available outside
// console.log(module)

// Creating a module
// logger.js
// // sample url
// var url = 'http://mylogger.io/log'

// function log(message) {
//     // Send an HTTP request
//     console.log(message)
// }

// // adding a method called log to exports object and set it up to log function we defined
// module.exports.log = log;  
// // when we want to call our url variable to endPoint
// // module.exports.endPoint = url; // but we will not do this because this is implementation detail

// Loading a module 
// const logger = require('./logger'); // we use require function to load a module
// best practice - assign the module to a constant
// console.log(logger)
// logger.log('message');

// // for single function call
// const log = require('./logger');
// console.log(log)
// log('direct function call');

// // PATH MODULE

// const path = require('path') // node will look for built in module named path and if not existing will look in your local dir

// var pathObj = path.parse(__filename);

// console.log(pathObj)
// // working with path function is better that working with strings when working with paths

// // OS MODULE
// // you may look at the node documentation on the web https://nodejs.org/en/docs/ and look for built in modules
// const os = require('os');

// var freeMemory = os.freemem();
// var totalMemory = os.totalmem();

// // console.log('Total Memory: ' + totalMemory);

// // Template string
// // ES6 / ES2015 : ECMAScript 6

// using interpolated or template string literals ${}
// console.log(`Total Memory: ${totalMemory}`)
// console.log(`Free Memory: ${freeMemory}`)

// // FILE SYSTEM MODULE
// // after we require a built in module we can use its method and these always comes in pair and you must prefer to use asynchronous method
// const fs = require('fs');


// const files = fs.readdir('./', function(err, files){
//     if(err) console.log('Error', err);
//     else console.log('Result: ',  files); // files is a list of string and it will return an object. if we concatenate it, the log function will convert it into string and append each string to the output. eg 'Result' + files
// }); 


// // EVENT MODULE
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// // Register a listener // this will catch the event and do something
// emitter.on('messageLogged', (eventArg) => {
//     console.log('Listener called', eventArg);
// });

// // Raise an event 
// // EVENT ARGUMENTS - below we can pass object as an argument to our listener
// emitter.emit('messageLogged', {
//     id: 1,
//     url: 'http://'
// }); // call all the listener synchronously. If you put this before listener nothing will happen


// // emit means - Making a noice, signaling - event

// // EXERCISE LOGGING
// console.log("")
// console.log("Exercise1")
// emitter.on('logging', (data) => {
//     console.log("An error occured: ", data)
// });

// emitter.emit('logging', {
//     severity: "critical"
// });
// console.log("")

// // EXTENDING AND EVENTEMITTER
// // call the logger.js
// const Logger = require('./logger');
// const logger = new Logger();

// // Raising an event from logger.js
// logger.on("loggerError", (eventArg) => {
//     console.log("Listener called", eventArg);
// });

// logger.log('message');

// // HTTP MODULE
// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url == '/' ) {
//         res.write('Hello World');
//         res.end();
//     }

//     if (req.url == '/api/courses') {
//         res.write(JSON.stringify([1, 2, 3])) // will convert the list to string using json syntax and write it to responce
//         res.end();
//     }
// });

// // // catching an event
// // server.on('connection', (stream) => {
// //     console.log('New connection...');
// // });

// server.listen(3000);

// // console.log('Listening on port 3000....');
 
// install npm version the same with mosh
// npm i -g npm@5.5.1 // not run yet
// npm init // to initialized
// npm init --yes // if you don't want to answer

// INSTALLING A NODE PACKAGE
// npm i underscore //this will create a node_modules dir and inside is the underscore module.
// this will also update the package.json dependencies and include underscore version

// USING A PACKAGE (3rd party modules)
// stored: npm-demo/index.js
// var _ = require('underscore');

// // 1st: node thinks that this underscore is a core module but since it's not
// // 2nd: the require function thinks that maybe it is a file or folder. 
// // so we put './underscore' and node will look for undercore.js. If not existing then it will look for underscore/index.js if exists
// // 3rd: if not 1st or 2nd, the require function will look underscore module in node_modules folder

// var result = _.contains([1,2,3,4], 2);
// console.log(result);

// mongoose - a node package use to store our data to mongodb

// PACKAGE DEPENDENCIES
// if our app is dependent on a node package for ex. buffer with version 1.0.0 but our newly installed mongoose has a dependency on
// buffer with version 2.0.0. A node_modules folder will be create under mongoose containing buffer v2. Otherwise all the dependency packages
// are stored in our app node_modules folder.

// all our package dependencies defined in package.json are stored in node_modules dir

// NPM Packages and Source Control
// you can exclude node_module from source control repository because we can get it just 
// by having "npm install" and this will look to package.json

// so if using git we have to ignore this npm_modules by adding the it in .gitignore file

// SEMANTIC VERSIONING(SemVer)
//"^4.13.6" // Major.Minor.Patch
          // Patch: when they fix a bug they will increase the patch version. (4.13.7)
          // Minor: Adding new features that don't break the existing api. (4.14.0)
          // Major: Potentially break the existing application. (5.0.0)
          // ^: we are interested on new changes or upgrade with any but only with version 4. (4.14.0) or (4.15.0) // auto upgrade when using"npm install"
          // using ^4 or 4.x are equal
          // ~: interested in 4.13 or 4.13.x
          // remove ^ or ~ or x and provide the exact version

// LIST INSTALLED PACKAGES
// to check the dependency of your application
// npm list
// npm list --depth=n // n for the depth

// VIEWING REGISTRY INFO FOR A PACKAGE
// npm view mongoose
// npm view mongoose dependencies // to look for dependencies only
// npm view mongoose version // for current version
// npm view mongoose versions // for all the past versions of mongoose
1
// INSTALLING A SPECIFIC VERSION
// npm i mongoose@2.4.2
// npm list --depth=0 

// UDATING LOCAL PACKAGE
// npm outdated // compare our dependencies and compare in npm registry
// npm update // only works with updating minor and patch releases

// install module for checking npm updates
// npm i -g npm-check-updates

// npm-check-updates -u // this will udpate our package.json
// npm install // to install the updated packages
// you can also use npx npm-check-updates -u or ncu -u
// version 7.21 will not update package.json if we update something thus you will have to run ncu


// DEVDEPENDENCIES
// specify using --save-dev to tell npm that we are going ton install dev dependency package
// npm i jshint --save-dev // this will create a separate section in package.json but not in node_modules
// note: everything is saved in node_modules but only separated in package.json

// Working with GLobal Packages
// we install package with command line parameters(argument) -g to make it global so that we can run it anywhere
// just like "npm i -g npm-check-updates" // after installed, we can run the command npm-check-updates anywhere in our system
// check outdate package "npm -g outdated"
// update package globally "npm -g update" // must run with sudo to work

// PUBLISHING A PACKAGE
// from lion-lib dir
// we created a new dir lion-lib
// npm init --yes
// edit the name of our app in package.json so we can publish it in node registry.
// create index.js
// we export a function
// npm adduser // if you do not have an account yet
// npm login // to login to your account in nodejs.com
// npm publish // to publish your app

// import the app you published by using require and you should be able to use the function you defined

// UPDATING A PUBLISHED PACKAGE
// after we added some features/functionalities in our app we want to update our package
// npm version [major, minor, patch] // to update the version of your app
// npm publish

// RESTful Services - Representational State Transfer - A convention of sharing our data to a client
// CRUD operations - Create, Read, Update, Delete
// HTTP METHODS    - Post(create data), Get(reading data), Put(updating data), Delete 

// Nodemon - dynamically wait for you changes, save it and restart the node service
// sudo npm i -g nodemon // always use sudo when using global installation

// ROUTE PARAMETERS
// HTTP POST REQUEST
// HTTP ENV VARIABLES
// on index.js

// To call http services we use POSTMAN
// install it from chrome extension

// Validating object for complex data
// install joi
// npm i joi
// open from google apps. -> drop down to POST -> supply the address with port -> toggle raw -> toggle JSON

// RESTFUL API USING EXPRESS -> express-demo/index.js

// refactoring or structuring express applications -> vidly/index.js

// Middleware topics -> index.js
// npm i morgan -> logging tool
// npm i config -> managing configuration tool
// npm i debug -> debugging tool

// Templating engines( but incase you need it )
// returning/generating dynamic html(return to client) instead of json -> use pug, mustache, ejs, or others


// DATABASE INTEGRATION
// look for expressjs.com -> Guide -> Database Integration -> MongoDb


// STRUCTURING EXPRESS APPLICATIONS -> put all the api code into a separate file
// vidly index.js contains routes.
// go to vidly where two files are created for routes. Two js files are createad and segregated ->
// the main code for api's are routed in movie.js. In order for this to work we have to use "Router" method


// ASYNC

// js has a single worker
// it will schedule a task and get/process the next query/task, the scheduled task will send an alert if finished then the worker will process it. 
// this is done with single thread.
// using callback, named function -> index.js
// using Promises -> promises.js and promises-api.js

// ASYNC and AWAIT
// helps you write asynchronous code like synchronous code

// CRUD OPERATION USING MONGOOSE
// check on mongo-demo/

// DATA VALIDATION
// with project using vidly + database
// mongo-demo/validating.js



