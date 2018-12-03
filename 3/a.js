var fs = require('fs');

fs.readFile("./3/3.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    var map = {};

    var values = data.split('\r\n').map(val => {
        return {
            id: val.split(' ')[0],
            x: parseInt(val.split(' ')[2].split(',')[0], 10),
            y: parseInt(val.split(' ')[2].split(',')[1].replace(':', ''), 10),
            width: parseInt(val.split(' ')[3].split('x')[0], 10),
            height: parseInt(val.split(' ')[3].split('x')[1], 10)
        }
    }).forEach(val => {
        for (let i = val.x; i < val.x + val.width; i++) {
            for (let j = val.y; j < val.y + val.height; j++) {
                let coords = i + ',' + j;

                if (map[coords])
                    map[coords] = 'x';
                else
                    map[coords] = coords;
            }
        }
    });

    let collisions = Object.keys(map).filter(x => map[x] === 'x').length;

    console.log(collisions);
});