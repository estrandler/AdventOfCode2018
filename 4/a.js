var fs = require('fs');

fs.readFile("./4/4.txt", "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }

    let guards = {};

    let sortedValues = data.split('\r\n').sort((a, b) => {
        let aDateString = a.substring(1, a.indexOf(']'));
        let bDateString = b.substring(1, b.indexOf(']'));

        let aDate = new Date(aDateString);
        let bDate = new Date(bDateString);

        return aDate - bDate;
    });

    let guardId = 0;
    let fellAsleepMinute = 0;
    for (let i = 0; i < sortedValues.length; i++) {
        let current = sortedValues[i];

        if (current.split(' ')[2] === 'Guard')
            guardId = parseInt(current.split(' ')[3].replace('#', ''), 10);
        else if (current.indexOf('falls asleep') > -1) {
            fellAsleepMinute = parseInt(current.split(':')[1].replace(']', ''), 10);
        } else if (current.indexOf('wakes up') > -1) {
            let wokeUpMinute = parseInt(current.split(':')[1].replace(']', ''), 10);

            guards[guardId] = guards[guardId] || { minutesSlept: {}, totalMinutes: 0 };


            for (let j = fellAsleepMinute; j < wokeUpMinute; j++) {
                guards[guardId].totalMinutes++;
                if (guards[guardId].minutesSlept[j] === undefined)
                    guards[guardId].minutesSlept[j] = 1;
                else
                    guards[guardId].minutesSlept[j]++;
            }
        }
    }

    let sleepyGuard = Object.keys(guards)
    .sort((a, b) => guards[b].totalMinutes - guards[a].totalMinutes)
    .map(a => {
        let re = guards[a];
        re.id = parseInt(a, 10);
        re.mostSlept = parseInt(Object.keys(re.minutesSlept).sort((x,y) => {
            return re.minutesSlept[y] - re.minutesSlept[x];
        })[0], 10);
        return re;
    })[0];

    console.log(sleepyGuard.id * sleepyGuard.mostSlept);
})
