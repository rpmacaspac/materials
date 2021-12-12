const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => {console.log('connected to database')});
    
const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    price: Number,
    date: Date,
    isPublished: Boolean
});

const Courses = mongoose.model('course', courseSchema);

// 2nd Exercise
async function getCourses(){
    return await Courses
        // using in
        // .find({isPublished: true, tags: { $in: ['frontend', 'backend']}})
        // using or
        .find({isPublished: true})
        .or([ {tags: 'frontend'}, {tags: 'backend'}])
        .sort({price: -1})
        .select('name author price');
};

// 3rd Exercise
async function getCourses3(){
    return await Courses
        .find({isPublished: true})
        .or([
            {name: /.*by.*/},
            {price: {$gte: 15}}
            ]);
};

async function run(){
const course = await getCourses3();
console.log(course);
};

run();

