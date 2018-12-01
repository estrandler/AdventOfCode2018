var fs = require('fs');

fs.readFile("./1/1.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let found = false;
    let visitedFrequencies = [];
    let value = 0;

    while (!found) {
        value = data
            .split('\r\n')
            .reduce((prev, next) => {
                let newVal = next[0] === '+' ? prev + parseInt(next.substring(1), 10) : prev - parseInt(next.substring(1), 10);

                if(visitedFrequencies.indexOf(newVal) > -1 && !found) {
                    console.log('Answer', newVal);
                    found = true;
                } else {
                    visitedFrequencies.push(newVal);
                }

                return newVal;
                
            }, value);

    };
})

