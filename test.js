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
    // This regex looks for a word starting with a capital letter followed by a number,
    // then any number of instances of '&' or ',' or 'and' or 'or' followed by another number
    const regex = /([A-Z][a-zA-Z]*\s*\d+)((\s*(and|or|&|,)\s*\d+)*)/g;

    // We store the resulting course names here
    let result = [];

    let match;
    while (match = regex.exec(text)) {
        // The first group is the course name followed by a number
        // The second group is any number of instances of '&' or ',' or 'and' or 'or' followed by a number
        // The second group might include 'and', 'or', '&' or ',' which we don't need, so we remove them
        let courses = match[1] + match[2];
        courses = courses.replace(/\s*(and|or|&|,)\s*/g, ' ');

        // We split the courses by spaces, then pair the course name with each number
        let parts = courses.split(' ');
        let prefix = null;
        for (let part of parts) {
            if (/[A-Z][a-zA-Z]*/.test(part)) {
                prefix = part;
            } else if (/\d+/.test(part)) {
                result.push(prefix + ' ' + part);
            }
        }
    }

    return result;
}
