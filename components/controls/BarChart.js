import { useD3 } from '../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  const ref = useD3(
    (svg) => {
        const extent = d3.extent(data, d => d.value);
        const padding = 9;
        const width = 320;
        const innerWidth = width - (padding * 2);
        const barHeight = 8;
        const height = 28;
    
        const xScale = d3.scaleLinear()
            .range([0, innerWidth])
            .domain(extent);
    
        const xTicks = data.map(d => d.value);
    
        const xAxis = d3.axisBottom(xScale)
            .tickSize(barHeight * 2)
            .tickValues(xTicks);
    
        const g = svg.append("g").attr("transform", "translate(" + padding + ", 0)");
    
        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient").attr("id", "myGradient");
        linearGradient.selectAll("stop")
            .data(data)
          .enter().append("stop")
            .attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0]) * 100) + "%")
            .attr("stop-color", d => d.color);
    
        g.append("rect")
            .attr("width", innerWidth)
            .attr("height", barHeight)
            .style("fill", "url(#myGradient)");
    
        g.append("g")
            .call(xAxis)
          .select(".domain").remove();
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: "28px",
        width: "320px",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;