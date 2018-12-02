const fs = require('fs');

fs.readFile("./2/2.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let getCombinations = word => {
        let combinations = [];
        for (let i = 0; i < word.length; i++) {
            let split = word.split('');
            split[i] = '*';
            combinations.push(split.join(''));
        }
        return combinations;
    }

    let value = data
        .split('\r\n');

    let element = value.shift();

    while (value.length > 0) {
        let combinations = getCombinations(element);

        value.forEach(elemInArray => {
            let arrCombinations = getCombinations(elemInArray);

            arrCombinations.forEach(combination => {
                if (combinations.indexOf(combination) !== -1) {
                    console.log('Answer', combination.replace('*', ''));
                }
            });
        })

        element = value.shift();
    }
});
