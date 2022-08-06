import React, { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';

function BarChart(episodes) {

  const svgRef = useRef(null)

  const width = 900
  const height = 600
  const padding = {
    left: 120,
    right: 120,
    top: 90,
    bottom: 90,
  }

  const colors = [
    "#ffd700",
    "#ffb14e",
    "#fa8775",
    "#ea5f94",
    "#cd34b5",
    "#9d02d7",
    "#0000ff"
  ]

  const yMin = d3.min(episodes.episodes, e=>e['count'])
  const yMax = d3.max(episodes.episodes, e=>e['count'])
  const yScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([height-padding.top, padding.bottom])

  const xVals = d3.map(episodes.episodes, e=>e.order)
  const xScale = d3.scaleBand()
    .domain(xVals)
    .range([padding.left, width-padding.right])

  const sVals = [...new Set(episodes.episodes.map(e => e.show))]
  const sScale = d3.scaleOrdinal()
    .domain(sVals)
    .range(d3.schemeTableau10)

  console.log('r', sVals, sScale(sVals[0]))

  const tooltip = d3.select('body').append('div')
    .attr('id', 'tooltip')

  const mouseover = (e, d, i)=>{
    let x = e.pageX
    let y = e.target.getBoundingClientRect().top

    let tooltipHtml = `<strong>${d['season']}x${d['episode']} - ${d['show']}</strong><br>
      ${d['count']}`

    tooltip
      // Add text
      .html(tooltipHtml)
      // Positioning
      .style('left', x + 'px')
      .style('top', y + 'px')
      .style('opacity', 0.9)
  }

  const mouseleave = (e, d)=>{
    tooltip.style('opacity', 0)
  }
  const svgElement = d3.select(svgRef.current)
  svgElement.selectAll('*').remove()

  const svg = svgElement
    .append('g')

  svg.selectAll('rect')
    .data(episodes.episodes)
    .enter()
    .append('rect')
    .attr('x', e=>xScale(e['order']))
    .attr('y', e=>yScale(e['count']))
    .attr("width", width/episodes.episodes.length)
    .attr("height", e=> yScale(0)-yScale(e['count']))
    .attr("fill", e=>sScale(e.show))
    .attr("class", "bar")
    .on('mouseover', mouseover)
    .on('mouseleave', mouseleave)

  const xAxis = d3.axisBottom(xScale)
    .ticks(6)
  svg.append('g')
    .attr('transform', `translate(0, ${height-padding.bottom})`)
    .attr('id', 'x-axis')
    .attr('class', 'axis')
    .call(xAxis)

  const yAxis = d3.axisLeft(yScale)
  svg.append('g')
    .attr('transform', `translate(${padding.left}, 0)`)
    .attr('id', 'y-axis')
    .attr('class', 'axis')
    .call(yAxis)


  return <svg 
    ref={svgRef} 
    width={width} 
    height={height}
  />
}

export default BarChart