// graph 
import * as d3 from "d3";


export function createChart(dataLogs: number[]) {
    // Declare the chart dimensions and margins.
    console.log("dataLogs", dataLogs)
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30; 
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    // scaleUtc for dates
    const x = d3.scaleLinear()
        .domain([1, dataLogs.length])
        .range([marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - marginBottom, marginTop]);


    ////// DRAW DATA

    // Declare the line generator.
    const line = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[1]));

    /////END DRAW DATA

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height);

    // Add the x-axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x));

    // Add the y-axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y));



    
    // Draw the line
     // Append a path for the line.
    const positions: [number, number][] = dataLogs.map((d, i) => [i, d])
    svg.append("path")
    .attr("transform", `100px,0`)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(positions));

    // Return the SVG element.
    return svg.node()
  }