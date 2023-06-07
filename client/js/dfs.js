// I am pretty confident this works but I have not tested it yet.
function dfs(course, visited = new Set()) {
    console.log(course); // Example: Print the course during traversal
    visited.add(course);

    const adjacentCourses = graph[course];
    if (adjacentCourses) {
        for (const adjacentCourse of adjacentCourses) {
            if (!visited.has(adjacentCourse)) {
                dfs(adjacentCourse, visited);
            }
        }
    }
}

// ? I chatGPT-ed this, I am not sure if it works or not, maybe you test it out.
function visualizeShortestPath(startCourse, targetCourse) {
    // Call the DFS algorithm to find the shortest path
    let shortestPath = dfs(startCourse, targetCourse);

    // Update the visualization
    node.attr("fill", d => shortestPath.includes(d.id) ? "blue" : "gray");
    link.attr("stroke", d => shortestPath.includes(d.source.id) && shortestPath.includes(d.target.id) ? "blue" : "gray");
}