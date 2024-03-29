"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { fetchCourseID, findCourses } from '@utils/util';

const drag = (simulation) => {
    const dragStarted = (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    const dragged = (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
    };

    const dragEnded = (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    };

    return d3.drag().on("start", dragStarted).on("drag", dragged).on("end", dragEnded);
};

const courseColor = (courseName) => {
    if (courseName.startsWith("CMPSCI") || courseName.startsWith('COMPSCI') || courseName.startsWith('INFO') || courseName.startsWith('CICS')) {
        return "#881c1c";
    } else if (courseName.startsWith('Math') || courseName.startsWith('STATISTC') || courseName.startsWith('MATH')) {
        return "#002554";
    } else {
        return "#ffc72c"; // default color
    }
};

const searchQueries = ['COMPSCI'];

const constants = {
    refX: 20,
    circleRadius: 20,
    markerWidth: 6,
    markerHeight: 6,
    scaleExtent: [0.1, 10],
    distance: 100,
    collide: 100
};

const CourseVisualizer = () => {
    const nodeRef = useRef();
    const [windowWidth, setWindowWidth] = useState(null);
    const [windowHeight, setWindowHeight] = useState(null);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

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
    };

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
    };

    const createD3Visualization = useCallback(async (nodes, links) => {
        const svg = d3.select(nodeRef.current)
            .attr("width", windowWidth)
            .attr("height", windowHeight);

        svg.selectAll("g").remove();

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(constants.distance))
            .force("charge", d3.forceManyBody(-10))
            .force("center", d3.forceCenter(windowWidth / 2, windowHeight / 2))
            .force("collide", d3.forceCollide(constants.collide));

        const container = svg.append("g");

        const zoom = d3.zoom()
            .scaleExtent(constants.scaleExtent)
            .on("zoom", (event) => {
                container.attr("transform", event.transform);
            });

        svg.call(zoom);

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
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value))
            .attr('marker-end', 'url(#arrowhead)');

        const node = container.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", constants.circleRadius)
            .attr("fill", d => courseColor(d.name))
            .call(drag(simulation));

        const label = container.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", "label")
            .text(d => d.name)
            .style("text-anchor", "middle")
            .style("fill", "#555")
            .style("font-family", "Arial")
            .style("font-size", 12);

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

        simulation.on("tick", ticked);
    }, [windowWidth, windowHeight]);

    useEffect(() => {
        const main = async () => {
            const courses = await processCourses();
            const { nodes, links } = createNodesAndLinks(courses);
            await createD3Visualization(nodes, links);
        };

        main();
    }, [windowWidth, windowHeight, createD3Visualization]);

    return (
        <div className="dashboard">
            <svg ref={nodeRef} className="h-screen w-screen"></svg>
        </div>
    );
};

export default CourseVisualizer;