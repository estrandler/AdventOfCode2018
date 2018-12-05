var fs = require('fs');

fs.readFile("./5/5.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let input;
    let output;
    let foundInIteration = true;
    let isUpperCase = (char) => char !== char.toUpperCase() && char === char.toLowerCase();

    let reactsWithNext = (curr, next) => {
        if ((isUpperCase(curr) && isUpperCase(next)) || (!isUpperCase(curr) && !isUpperCase(next))) {
            return false;
        }

        return curr.toUpperCase() === next.toUpperCase();
    }

    while (foundInIteration) {
        input = input || data;
        foundInIteration = false;
        let indexesToSkip = [];

        for (let i = 0; i < input.length - 1; i++) {
            let curr = input[i],
                next = input[i + 1];

            if (indexesToSkip.indexOf(i) === -1) {

                if (reactsWithNext(curr, next)) {
                    foundInIteration = true;
                    indexesToSkip.push(i);
                    indexesToSkip.push(i + 1);
                }

            }
        }

        output = '';
        for(let i = 0; i < input.length; i++) {
            if(indexesToSkip.indexOf(i) === -1){
                output += input[i];
            }
        }

        input = output;
    }

    console.log(input);
    console.log(input.length);
})
