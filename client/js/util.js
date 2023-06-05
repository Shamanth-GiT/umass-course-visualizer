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

export{ fetchCourseID };