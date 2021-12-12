
// // Creating settled promises(already resolve and has an error)
// const p = Promise.resolve({ id: 1});
// p.then(result => console.log(result));

// const p2 = Promise.reject(new Error('Reason for rejection'));
// p2.catch(error => console.log(error))

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('calling async operation1...');
        // reject(new Error('something failed'));
        resolve(1);
    }, 2000);
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('calling async operation2...');
        resolve(2);
    }, 2000);
})

// p1.then(result => console.log(result));

// this method will return when all the result of the promises are resolved.
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error: ', err.message));

// note that on the above example 1. we are still dealing with one thread kicking off
// multiple async operations almost at the same time
// 2. we get the result and put it in array
// 3 if any of our promises is rejected, our promises result from Promise.all is rejected

// // sometimes we wanna do something immediately after the 1st async operation completed 
// and so we wanna see the result after it completes. we use Promise.race
// Promise.race([p1, p2])
//     .then(result => console.log(result));