async function fetchCourseID (search){
    try {
        const response = await fetch('https://spire-api.melanson.dev/courses/?search=' + search);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        return data;
    } catch(error){
        console.log("could not get data");
    }
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


export{ fetchCourseID, findCourses };