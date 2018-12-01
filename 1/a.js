var fs = require('fs');

fs.readFile("./1/1.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    var value = data
        .split('\r\n')
        .reduce((prev, next) => next[0] === '+' ? prev + parseInt(next.substring(1), 10) : prev - parseInt(next.substring(1), 10));


    console.log(value);
});