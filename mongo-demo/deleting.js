const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('login successful'));
// mongoose.model('Course');
// // UPDATING A DOCUMENT - QUERY FIRST
// // findId()
// // Modify its properties
// // save()

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ], // technically the object in this array is stored in key, value pair(index, value)
    data: Date, // create an object with these properties
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);


// Updating using query first
async function removeCourse(id){
  const result = await Course.deleteOne( {_id: id}); // returns the result
  // or
//   const course = await Courst.findByIdAndRemove(id); // returns the object or null if not existing anymore
  console.log(result);
}

removeCourse("61a49b46008aae2b765c6242")
    .catch(err => console.log("Error: ", err.message));

