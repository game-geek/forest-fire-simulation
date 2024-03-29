
import * as d3 from "d3";


export default function drawGraph(dataLogs: number[]) {
    
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // Create the SVG container.
    const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

 

    const positions: {time: number, value: number}[] = dataLogs.map((d, i) =>{return {time: i, value: d}})


    // Add X axis
    let highestXPoint = d3.max(positions, function(d) { return d.time; }) || 1
    var x = d3.scaleLinear()
    .domain([0, highestXPoint])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", "translate(25," + (height + 20) + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    let highestYPoint = d3.max(positions, function(d) { return d.value; }) || 1
    console.log(highestXPoint, highestYPoint)
    var y = d3.scaleLinear()
    .domain([0, highestYPoint])
    .range([ height, 0 ]);
    svg.append("g")
    .attr("transform", "translate(25," + "20 )")
    .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
    .datum(positions)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    // @ts-ignore
    .attr("d", d3.line()
    // @ts-ignore
        .x(function(d) { return x(d.time) })
        // @ts-ignore
        .y(function(d) { return y(d.value) })
        )
    .attr("transform", "translate(25," + "20 )")
    return svg.node()
}
