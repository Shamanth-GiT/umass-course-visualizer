//This is a demo of the first page only, there are multiple pages to parse
fetch('https://spire-api.melanson.dev/courses/?search=COMPSCI')
    .then(response => {
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        let dict = findPrereq(data);
        console.log(dict);
    })
    .catch(e => {
        console.log('There was a problem with your fetch operation: ' + e.message);
    });


function findPrereq(data) {
    let dict = {};
    for (let i = 0; i < data.results.length; i++) {
        //let prerequisites = [];
        //console.log(data.results[i].enrollment_information)
        let result = data.results[i].enrollment_information === null ? null : data.results[i].enrollment_information.enrollment_requirement;
        let prereq = result === null ? null : findCourses(result);
        //console.log(prereq)
        dict[data.results[i].id] = prereq;
    }
    return dict;
}

function findCourses(text) {
    const regex = /([A-Z][a-zA-Z]*)\s*((\d+[A-Za-z]*\s*(and|or|&|,)\s*)*\d+[A-Za-z]*(\s*or\s*\d+[A-Za-z]*)?)/g;
    let result = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        let prefix = match[1];

        // Ignore course names that consist of a single letter
        if (prefix.length === 1) {
            continue;
        }

        let courseCodesStr = match[2];
        courseCodesStr = courseCodesStr.replace(/\s*(and|or|&|,)\s*/g, ' ');

        let courseCodes = courseCodesStr.match(/\d+[A-Za-z]*/g);

        for (let courseCode of courseCodes) {
            result.push(prefix + ' ' + courseCode);
        }
    }

    return result;
}