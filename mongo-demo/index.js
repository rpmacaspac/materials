// CRUD OPERATION USING MONGOOSE (CREATE, READ, UPDATE, DELETE)

// after installing mongodb I have recieved an error after running npm init --yes -> env: node: No such file or directory
// solution is -> brew link --overwrite node

// applying what we have learn in express-demo class
const dbDebugger = require('debug')('app:db');
const config = require('config');

//connect to mongodb
const mongoose = require('mongoose');
dbServer = config.get('server.host');

mongoose.connect(`mongodb://${dbServer}/playground`) //playground is not yet created upon writting but mongodb will automatically create this for us.
    .then(() => dbDebugger('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));



// mongoose - we have schema but it's not part of mongodb. We use schema in mongoose to define the shape of documents in a mongodb collection.
// use to define the properties of an object

// let's define the shape of course document in mongodb database
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ], // technically the object in this array is stored in key, value pair(index, value)
    data: { type: Date, default: Date.now }, // create an object with these properties
    isPublished: Boolean
});

// Note: capital letter "C"ourse because it returns a class not an object.
const Course = mongoose.model('Course', courseSchema) // 1st argument is the singular name of our collection, 2nd is the schema that defines the shape of our document.
// // below objects map into our mongodb database course
// async function createCourse() {
//     const course = new Course({
//         name: 'Angular Course',
//         author: 'Menow',
//         tags: ['angular', 'frontend'],
//         isPublished: true
//     });
    
    
//     const result = await course.save(); // mongodb will assign an id for this course document
//     console.log(result); 
// }


// question: why do we have to use await? -> (syntactical sugar) 
// createCourse();

// Querying on our mongoDB
async function getCourses() {
    // PAGINATION
    const pageNumber = 2;
    const pageSize = 10;
    
 // Comparison query operations

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte(less than or equal to)
    // in
    // nin (not in)
    

 // Logical query operators
 // or
 // and
    const courses = await Course 

        // ORIGINAL QUERY
        .find({ author: 'Menow', isPublished: true}) // inside the find function is an object that holds the filter
        
        // COMPARISON QUERY
        //.find({ price: { $gte: 10, $lte: 20 }}) // use $ when using operator. This query greater than or equal to 10 but less than or equal to 20
        // .find({ price: { $in: [10, 15, 20] } }) // look for price with either 10, 15 or 20.
        
        // LOGICAL QUERY
        // .find()
        // .or([ { author: "menow" }, { isPublished: true }]) // has the same syntax with and
        
        // // USING REGULAR EXPRESSION
        // // syntax: /pattern/
        // // insensitive case syntax: /pattern/i
        // .find({ author: /^Men/ }) //starts with
        // .find({ author: /now$/i }) //ends with
        // .find({ author: /.*no.*/i }) // .* means zero or more chars 

        
        // formula for pagination. We have to combine skip with limit
        .skip((pageNumber - 1) * pageSize) // if we want to check the document on the last page
        .limit(pageSize)
        .sort({ name: 1 }) //// 1 means ascending order, -1 for descending
        // .select({ name: 1, tags: 1}); // select the properties that we want to be returned
        .count(); // to count number of documents in our database
    console.log(courses);
}

getCourses(); 


