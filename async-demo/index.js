console.log('Before');
//callbacks before named function
// getUser(1, (user) => {
//     getRepositories(user.gitHubUserName, (repos) => {
//         getCommit(repos[0], (commits) => {
//             console.log('commits: ', commits);
//         });
//         // console.log('Repos: ', repos);
//     })
//     //console.log('User: ', user);
// });

//callback hell -> as our code progress, we can have nested callback function
// now we use "named functions" to rescue

// // USING NAMED FUNCTION
// getUser(1, getRepository);

// function displayCommits(commits) {
//     console.log('commits', commits);
// };
// function getCommits(repos){
//     getCommit(repos[0], displayCommits);
// };
// function getRepository(user) {
//     getRepositories(user.gitHubUserName, getCommits);
// }
// console.log('After');


//PROMISES
// holds the eventual result of an asynchronous operation
// promise.js

// using promise

// getUser(1)
//     .then(user => getRepositories(user.gitHubUserName))
//     .then(repos => getCommit(repos[0]))
//     .then(commit => console.log(commit))
//     .catch(err => console.log('Error', err.message));

console.log('After');


// Async and await approach - syntactical sugar for coding like synchronous but our code still works asynchronously
// we use try & catch block to catch the error
async function displayCommits() {
    try {
        const user = await getUser(1); // this convert into something like our promises code above
        const repos = await getRepositories(user.gitHubUserName);
        const commits = await getCommit(repos[0]);
        console.log(commits);
    }
    catch(err) {
        console.log('Error', err.message);
    }
}

displayCommits(); // result is promise object. async and await built inside promise


// with using PROMISE object
function getUser(id) { //callback - callback function will call when the result of the operation is ready 
    return new Promise((resolve, reject) => {
        // Kick off some async work
        setTimeout(() => {
        console.log('Reading a user from a database...');
        resolve({ id: id, gitHubUserName: 'rmac'});
    }, 2000);
    });

}
// problem: if the result is not available yet for a function, it will return undefined. There are three ways to deal with it.
// Before
// undefined // printing out the result of calling getUser()
// After
// Reading a user from a database...
// 3 PATTERNS TO DEAL WITH ASYNCHRONOUS CODE
// callback, promises, async/await

//callback
function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'));
        }, 2000);
    })
};

function getCommit(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting commits...');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    })
};