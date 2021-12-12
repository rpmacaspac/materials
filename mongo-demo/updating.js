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
async function updateCourse(id){
    const course = await Course
        // .find({isPublished: true});
        .findById(id);
    if(!course) return;
    // update property
    course.isPublished = true;
    course.author = 'another author';
    // // above is same with below
    // course.set({
    //     isPublished: true,
    //     author: 'another author'
    // });

    const result = await course.save();
    console.log(result);
    // console.log(course)
 
}

// updateCourse("61a49b46008aae2b765c6242")
//     .catch(err => console.log("Error: ", err.message));

// Updating using update first
async function updateCourse2(id){
    // const result = await Course
    const course = await Course

        // get the document that was updated
        // we get a course object below
            .findByIdAndUpdate(id, {
                $set: {
                            author: 'rmac',
                            isPublished: true
                        }
            }, {new: true } ); // if you don't add this it will display the object before the update

        // We get the result below and not the course object
        // .updateOne( { _id: id}, { // passing {} as query object
        //     $set: {
        //         author: 'Mosh',
        //         isPublished: false
        //     }
        // });
 
    // console.log(result);
    console.log(course)
}

updateCourse2("61a49b46008aae2b765c6242")
    .catch(err => console.log("Error: ", err.message));
