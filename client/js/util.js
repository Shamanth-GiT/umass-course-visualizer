async function fetchCourseID(search) {
    let page = 1;
    let results = [];

    while (true) {
        try {
            const response = await fetch(`https://spire-api.melanson.dev/courses/?page=${page}&search=${search}`);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const data = await response.json();

            // Combine the new data with the results we have so far.
            results = results.concat(data);

            // Check if there's a next page. This will depend on how your API communicates this.
            // If the API includes a 'next' field in the response that is null when there are no more pages:
            if (!data.next) break;

            // If the API includes a 'total_pages' field in the response:
            // if (page >= data.total_pages) break;

            // Go to the next page
            page++;
        } catch (error) {
            console.log("could not get data");
            break;
        }
    }
    //console.log(results)
    return results;
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