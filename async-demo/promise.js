// promise - is an object that holds the eventual result of an asynchornous operation
// initially it is on pending state
// construction fuctions
const p = new Promise((resolve, reject) => {
    // kick off some async work
    // ...
    setTimeout(() => {
        // resolve(1); //pending -> resolved, fulfilled
        reject(new Error('message')); // pending -> rejected
    }, 2000);
    
})

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));

    // note: anywhere you have asynchronous function that takes a callback, you should modify that 
    // function to return a promise