var fs = require('fs');

fs.readFile("./6/6.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let isNotEdge = (coordinates, coordsArr) => {
        let smallerX = coordsArr.filter(x => x.x < coordinates.x);
        let higherX = coordsArr.filter(x => x.x > coordinates.x);
        let smallerY = coordsArr.filter(x => x.y < coordinates.y);
        let higherY = coordsArr.filter(x => x.y > coordinates.y);

        return smallerX.length && smallerY.length && higherX.length && higherY.length;
    }

    let ManhattanDistance = (x1, x2, y1, y2) => {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    let coords = data.split('\r\n').map((element) => {
        return {
            x: parseInt(element.split(', ')[0], 10),
            y: parseInt(element.split(', ')[1], 10)
        }
    });
    

    console.log(coords);

    let minX = coords.sort((x, y) => x.x - y.x)[0].x - 1;
    let maxX = coords.sort((x, y) => y.x - x.x)[0].x + 1;
    let minY = coords.sort((x, y) => x.y - y.y)[0].y - 1;
    let maxY = coords.sort((x, y) => y.y - x.y)[0].y + 1;

    let area = {};


    for (let x = 0; x <= maxX; x++) {
        for (let y = 0; y <= maxY; y++) {
            let distances = coords.map(coord => {
                coord.distance = ManhattanDistance(x, coord.x, y, coord.y);
                return coord
            }).sort((a, b) => a.distance - b.distance);

            if (distances[0].distance === distances[1].distance) {
                continue;
            }


            if (!distances[0].IsEdge) {
                let selector = distances[0].x + ',' + distances[0].y;

                area[distances[0].x + ',' + distances[0].y] = area[distances[0].x + ',' + distances[0].y] || 0;
                area[distances[0].x + ',' + distances[0].y]++;
            }
        }
    }


    console.log(area);


    let largest = Object.keys(area).sort((x, y) => area[y] - area[x]).map(val => area[val])[0];

    console.log(largest);
})