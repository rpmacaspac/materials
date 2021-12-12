const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('login successful'));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
        // match : /pattern/                     // for using regex
         },
    category: {
        type: String,
        required: true,
        enum: [ 'web', 'mobile', 'network' ],
        // schema type option
        lowercase: true, // convert it to lowercase
        trim: true
    },
    author: String,
    // custom validation
    tags: {
        // required: true,
        type: Array,
        validate: { 
            // async validator
            isAsync: true, // doesn't work
            // validator: (v, callback) => 
            // {
            //     // Do some async work
            //     // simulate asyn with setTimeout
            //     setTimeout(() => {
            //         const result = v && v.length > 0; // logic on what to do with the data we get
            //         callback(result);
            //     }, 1000);
                
            // },
            validator: (v, callback) => {
              setTimeout(() => {
                  const result = v && v.length > 0;
                  callback(result);
              }, 4000); 
            },
            message: 'A course should have atleast 1 tag'      
        }
    },
    // tags: [ String ], // technically the object in this array is stored in key, value pair(index, value)
    data: Date, // create an object with these properties
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        //for numbers we can have min and max
        },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);


// Updating using query first
async function createCourse(){
   const course = new Course({
        name: 'my course',
        category: "Web",
        author: 'rmac',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
   });

try{ 
    
    const result = await course.save();
    console.log(result);
}
    catch (ex) {
        for(field in ex.errors)
            console.log(ex.errors[field].message); // to get the error per property
    };

   

};

// updateCourse("61a49b46008aae2b765c6242")
//     .catch(err => console.log("Error: ", err.message));
console.log('doing some task');
createCourse();
