import * as util from "./util.js";

let defs = d3.select('svg').append('defs');

defs.append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '-0 -5 10 10')
    .attr('refX', 13)
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 20)
    .attr('markerHeight', 20)
    .attr('xoverflow', 'visible')
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', 'gray')
    .style('stroke', 'none');

let courses = {};
let search_queries = ['COMPSCI'];
// create nodes and links for the graph
let nodes = [];
let links = [];
search_queries.forEach(search => {
    const promise = util.fetchCourseID(search);
    promise.then(data => {
        //console.log(data)
        let ids = data.map(x => x.results.map(y => y["id"])).flat();
        // console.log(ids);
        let descriptions = data.map(x => x.results.map(y => y["enrollment_information"] === null ? null : y["enrollment_information"]["enrollment_requirement"])).flat();
        ids.forEach(elem => {
            courses[elem] = descriptions[ids.indexOf(elem)] === null ? null : util.findCourses(descriptions[ids.indexOf(elem)]);
        });
        console.log(descriptions);
        return courses;
    }).then(courses => {
        //Filter out courses with null or empty prereqs
        for (let course in courses) {
            if (courses[course] === null || courses[course].length === 0) {
                delete courses[course];
            }
        }
        console.log(courses);
        return courses;
    }).then(courses => {
        console.log(courses);
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
                        source: prereq,
                        target: course
                    });
                } else {
                    nodes.push({
                        id: prereq,
                        name: prereq
                    });
                    links.push({
                        source: prereq,
                        target: course
                    });
                }
            }
        }

        function courseColor(courseName) {
            if (courseName.includes('COMPSCI') || courseName.includes('INFO') || courseName.includes('CICS')) {
                return "maroon";
            } else if (courseName.includes('Math') || courseName.includes('STATISTC') || courseName.includes('MATH')) {
                return "blue";
            } else {
                return "black"; // default color
            }
        }

        // Create the SVG container
        const svg = d3.select("svg");

        // Create the simulation
        const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody(-10))
        .force("center", d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2))
        .force("collide", d3.forceCollide(100));

        // Create the links
        // const link = svg.append("g")
        // .attr("class", "links")
        // .selectAll("line")
        // .data(links)
        // .enter()
        // .append("line")
        // .attr("stroke-width", 3)
        // .attr("stroke", "gray");


        // Create the links
        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke-width", 3)
            .attr("stroke", "gray")
            .attr('marker-end', 'url(#arrowhead)');  // This adds the arrow to the end of each link

        
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
    });
});

























