const fs = require('fs');

fs.readFile("./2/2.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let containingThreeLetters = 0;
    let containingTwoLetters = 0;

    let value = data
        .split('\r\n')
        .filter((item) => (item.split('').filter((item2, index, array) => array.indexOf(item2, index + 1) !== -1)).length > 0)
        .map((item) => {
            let uniqueLetters = item.split('').filter((item2, index, array) => array.indexOf(item2, index + 1) !== -1);
            let output = {};

            item.split('').forEach(char => {
                if (uniqueLetters.indexOf(char) > -1) {
                    if (output[char])
                        output[char]++;
                    else
                        output[char] = 1;
                }
            });

            var result = Object.keys(output)
                .filter(key => output[key] === 2 || output[key] === 3)
                .map(key => {
                    return { character: key, count: output[key] }
                })

            return result.sort((a, b) => a.count < b.count);
        })
        .filter(el => el[0] != undefined)
        .forEach(item => {
            if (item[0].count > 2) {
                containingThreeLetters++;

                if (item[1] && item[1].count == 2)
                    containingTwoLetters++
            } else
                containingTwoLetters++;
        });

    console.log(containingThreeLetters * containingTwoLetters);
});
