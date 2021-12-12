const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(new Error('Cannot connect to database')));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    tags: [ String ],
    price: {
        type: Number,
        min: 12,
        max: 200,
        required: function() {
            return this.isPublished;
        },
        get: v => Math.round(v),
        set: v => Math.round(v)

    },
    date: Date
});
 
const Course = new mongoose.model("courses", courseSchema);

// we separate the function for 
// 1.GETTING THE COURSES

async function getCourses() {
    // const courses = await Course
    return await Course
        // .find({ isPublished: true, tags: 'backend' })
        .find({ _id: '61b37adcd0b306ffc11134c8'})
        //.sort({name: 1}) // or pass the property string -> .sort('name') for ascending or .sort('-name') for descending
        .select({ name: 1, author: 1, price: 1}); // or .select('name)
        // console.log(courses);

};
// getCourses();
// 2.DISPLAYING THE COURSES
async function run(){
    const courses = await getCourses();
    console.log(courses[0].price);
}

run();
