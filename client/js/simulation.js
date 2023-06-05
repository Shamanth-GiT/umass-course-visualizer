// Sample data
let courses = {
    //'COMPSCI 102': [],
    //'COMPSCI 105': [],
    //'COMPSCI 119': [],
    //'COMPSCI 120': [],
    'COMPSCI 121': ['Math 101', 'Math 102', 'Math 104', 'Math 127', 'Math 128', 'Math 131', 'Math 132'],
    // 'COMPSCI 145': [],
    'COMPSCI 186': ['COMPSCI 121', 'Math 101', 'Math 102', 'Math 104', 'Math 127', 'Math 128', 'Math 131', 'Math 132'],
    'COMPSCI 187': ['COMPSCI 121', 'COMPSCI 186', 'COMPSCI 190D'],
    // 'COMPSCI 190F': [],
    // 'COMPSCI 191CMPS1': [],
    // 'COMPSCI 196': [],
    // 'COMPSCI 196ISH': [],
    // 'COMPSCI 197B': [],
    'COMPSCI 197C': ['COMPSCI 186', 'COMPSCI 187'],
    // 'COMPSCI 197Q': [],
    // 'COMPSCI 197S': [],
    // 'COMPSCI 197SC01': [],
    // 'COMPSCI 197U': [],
    'COMPSCI 197WP': ['COMPSCI 121'],
    'COMPSCI 198C': ['COMPSCI 121', 'COMPSCI 186']
}

// create nodes and links for the graph
let nodes = [];
let links = [];

// create nodes
for (let course in courses) {
    nodes.push({
        id: course,
        name: course
    });
}

// create links
//Check if every course in prereqs is in nodes
//If it is, add a link from the course to the prereq
//If it isn't, add the course to nodes and add a link from the course to the prereq
for (let course in courses) {
    for (let prereq of courses[course]) {
        if (nodes.some(node => node.id === prereq)) {
            links.push({
                source: course,
                target: prereq
            });
        } else {
            nodes.push({
                id: prereq,
                name: prereq
            });
            links.push({
                source: course,
                target: prereq
            });
        }
    }
}

function courseColor(courseName) {
    if (courseName.includes('COMPSCI')) {
        return "red";
    } else if (courseName.includes('Math')) {
        return "blue";
    } else {
        return "black"; // default color
    }
}

// Create the SVG container
const svg = d3.select("#svg");

// Create the simulation
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody(-10))
    .force("center", d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2))
    .force("collide", d3.forceCollide(100));

// Create the links
const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", 3)
    .attr("stroke", "gray");

// Create the nodes
const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    .attr("fill", d => courseColor(d.name))
    .call(drag(simulation)); // Add drag behavior to nodes

// Add labels to the nodes
const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .text(d => d.name)
    .attr("font-size", "14px")
    .attr("dx", 22)
    .attr("dy", 4);

// Define the tick function
const ticked = () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

    label.attr("x", d => d.x)
        .attr("y", d => d.y);
};

// Run the simulation
simulation.on("tick", ticked);

// Drag behavior function
function drag(simulation) {
    function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded);
}