var fs = require('fs');

fs.readFile("./7/7.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let getChildren = (node, instructions) => {
        return instructions.filter(val => val.dependentOn === node.id).sort((a, b) => ('' + a.id).localeCompare(b.id));
    }

    let allDependenciesAreSolved = (node, resultArr) => {
        let debug = ['B', 'D', 'H', 'I', 'O', 'X'].indexOf(node.id) !== -1;

        if (debug)
            console.log('debug');

        let allSolved = true;

        for (let i = 0; i < node.dependecies.length; i++) {
            if (resultArr.indexOf(node.dependecies[i]) === -1) {
                allSolved = false;
                break;
            }
        }
        return allSolved;
    }

    let pushToResultRecursively = (node, instructions, obj, resultArr) => {
        if (node.dependecies.length === 0)
            resultArr.push(node.id);

        else if (allDependenciesAreSolved(node, resultArr))
            resultArr.push(node.id);


        var children = getChildren(node, instructions);


        children.forEach(child => {
            pushToResultRecursively(obj[child.id], instructions, obj, resultArr);
        });

        return;
    }

    let order = [];
    let obj = {};
    let instructions = data.split('\r\n').map((val) => {
        return {
            id: val.split(' ')[7],
            dependentOn: val.split(' ')[1]
        }
    });

    instructions.forEach(val => {
        if (obj[val.id] && obj[val.id].dependecies) {
            obj[val.id].dependecies.push(val.dependentOn);
        }
        else
            obj[val.id] = {
                id: val.id,
                dependecies: [val.dependentOn]
            }

        if (!obj[val.dependentOn])
            obj[val.dependentOn] = {
                id: val.dependentOn,
                dependecies: []
            }
    });

    let starter = Object.keys(obj).sort((x, y) => obj[x].dependecies.length - obj[y].dependecies.length)[0];

    pushToResultRecursively(obj[starter], instructions, obj, order);


    console.log(order.join(''));

})
