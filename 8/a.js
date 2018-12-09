let fs = require('fs');


fs.readFile("./8/8.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let numbers = data.split(' ').map(val => parseInt(val, 10));

    console.log(numbers);

    let parent;
    for(let i = 0; i < numbers.length; i++) {
        

    }
});
