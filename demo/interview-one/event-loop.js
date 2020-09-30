setTimeout(function() {
    console.log("setTimeout1");
    new Promise(function(resolve) {
        console.log("promise1-1");
        resolve();
    }).then(function() {
        console.log("promise1-2");
    });
}, 0);
setTimeout(function() {
    console.log("setTimeout2");
    new Promise(function(resolve) {
        console.log("promise2-1");
        resolve();
    }).then(function() {
        console.log("promise2-2");
    });
}, 0);