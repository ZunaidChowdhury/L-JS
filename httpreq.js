const getTodos = (resource, /*callback*/) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        // callback(undefined, data);
        resolve(data);
      } else if (request.readyState === 4) {
        // callback("could not fetch data", undefined);
        reject('error getting resource.');
      }
    });

    // request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');
    // request.open('GET', 'todos.json');
    request.open("GET", resource);
    request.send();
  });
};


// //with callback func
// getTodos("https://jsonplaceholder.typicode.com/todos/", (err, data) => {
//   console.log("callback fired.");
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// // without callback func & using promise.
// getTodos('todos/luigi.json').then(data => {
//     console.log('promise resolved:', data);
// }).catch(err => {
//     console.log('promise rejected:', err);
// });

// chaining promises
getTodos('todos/luigi.json').then(data => {
    console.log('promise 1 resolved: ', data);
    return getTodos('todos/mario.json');
}).then(data => {
    console.log('promise 2 resolved: ', data);
    return getTodos('todos/shaun.json');
}).then(data => {
    console.log('promise 3 resolved:', data);
}).catch(err => {
    console.log('promise rejected:', err);
});