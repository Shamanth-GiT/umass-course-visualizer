import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { fetchCourseID, findCourses } from '../util/Util';
import '../theme/course_visualizer.css'

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

// Modularized function for course color selection.
function courseColor(courseName) {
    if (courseName.startsWith("CMPSCI") || courseName.startsWith('COMPSCI') || courseName.startsWith('INFO') || courseName.startsWith('CICS')) {
        return "#881c1c";
    } else if (courseName.startsWith('Math') || courseName.startsWith('STATISTC') || courseName.startsWith('MATH')) {
        return "#002554";
    } else {
        return "#ffc72c"; // default color
    }
}

const searchQueries = ['COMPSCI'];

// These constants can be adjusted.
const constants = {
    refX: 20,
    circleRadius: 20,
    markerWidth: 6,
    markerHeight: 6,
    scaleExtent: [0.1, 10],
    distance: 100,
    collide: 100
};

export const CourseVisualizer = () => {
    const nodeRef = useRef();

    const processCourses = async () => {
        const courses = {};

        for (const search of searchQueries) {
            const data = await fetchCourseID(search);

            const courseMap = new Map();
            data.forEach(item => {
                item.results.forEach(result => {
                    courseMap.set(result["id"], result["enrollment_information"] === null ? null : findCourses(result["enrollment_information"]["enrollment_requirement"]));
                });
            });

            for (const [courseId, description] of courseMap) {
                if (description !== null && description.length > 0) {
                    courses[courseId] = description;
                }
            }
        }
        return courses;
    }

    const createNodesAndLinks = (courses) => {
        const nodes = [];
        const links = [];

        for (let course in courses) {
            nodes.push({
                id: course,
                name: course
            });
        }

        for (let course in courses) {
            for (let prereq of courses[course]) {
                prereq = prereq.toUpperCase();
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

        return { nodes, links };
    }

    const createD3Visualization = async (nodes, links) => {
        const svg = d3.select(nodeRef.current);
        
        svg.selectAll("g").remove();

        // Create the simulation
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(constants.distance))
            .force("charge", d3.forceManyBody(-10))
            .force("center", d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2))
            .force("collide", d3.forceCollide(constants.collide));

        // Create a container inside SVG to hold all other elements
        const container = svg.append("g");

        // Create zoom behavior
        const zoom = d3.zoom()
            .scaleExtent(constants.scaleExtent)
            .on("zoom", (event) => {
                container.attr("transform", event.transform);
            });

        // Apply the zoom behavior to the svg
        svg.call(zoom);

        // Append defs to the container
        const defs = container.append('defs');

        defs.append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', constants.refX)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', constants.markerWidth)
            .attr('markerHeight', constants.markerHeight)
            .attr('xoverflow', 'visible')
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', 'gray')
            .style('stroke', 'none');

        const link = container.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke-width", 3)
            .attr("stroke", "gray")
            .attr('marker-end', 'url(#arrowhead)');  // This adds the arrow to the end of each link

        const node = container.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", constants.circleRadius)
            .attr("fill", d => courseColor(d.name))
            .call(drag(simulation)); // Add drag behavior to nodes

        const label = container.append("g")
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
    }

    useEffect(() => {
        const main = async () => {
            const courses = await processCourses();
            const { nodes, links } = createNodesAndLinks(courses);
            await createD3Visualization(nodes, links);
        }

        main();
    }, []);  // empty dependency array to mimic componentDidMount

    return (
        <div className="course-visualizer">
            <svg ref={nodeRef} width={2000} height={2000}></svg>
        </div>
    );
};