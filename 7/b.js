var fs = require('fs');

fs.readFile("./7/7.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let Run = (instructions) => {
        instructions.forEach(qi => {
            let depen = instructions.filter(q => q.dependecies.indexOf(qi.id) !== -1);

            if (depen.length === 0) {
                qi.isReady = true;
            }
        });

        let ready = instructions.filter(q => q.isReady === true);


        if (ready.length > 0) {
            let firstReady = ready.sort((a, b) => ('' + a.id).localeCompare(b.id))[0];
            order += firstReady.timeToRun;
            instructions = instructions.filter(x => x.id !== firstReady.id);
        }

        if (instructions.length > 0) {
            Run(instructions);
        }
    }

    let obj = {};
    let order = 0;
    let instructions = data.split('\r\n').map((val) => {
        return {
            id: val.split(' ')[1],
            dependentOn: val.split(' ')[7]
        }
    });

    instructions.forEach(val => {
        if (obj[val.id])
            obj[val.id].dependecies.push(val.dependentOn);
        else
            obj[val.id] = {
                id: val.id,
                isReady: false,
                timeToRun: val.id.charCodeAt() - 64,
                dependecies: [val.dependentOn]
            }

        if (!obj[val.dependentOn]) {
            obj[val.dependentOn] = {
                id: val.dependentOn,
                isReady: false,
                timeToRun: val.dependentOn.charCodeAt() - 64,
                dependecies: []
            };
        }
    });

    instructions = Object.keys(obj).map(x => obj[x]);

    Run(instructions);
    console.log(instructions);

    let result = order / 2;

    //console.log(result);
})
