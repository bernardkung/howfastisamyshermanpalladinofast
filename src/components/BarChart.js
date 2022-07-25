import React, { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';

function BarChart(episodes) {

  const svgRef = useRef(null)

  const width = 700
  const height = 600
  const padding = 90

  const yMin = d3.min(episodes.episodes, e=>e['word_counts']['total'])
  const yMax = d3.max(episodes.episodes, e=>e['word_counts']['total'])
  const yScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([height-padding, padding])

  const xVals = d3.map(episodes.episodes, e=>e['season_number']*100+e['episode_number'])
  const xScale = d3.scaleBand()
    .domain(xVals)
    .range([padding, width-padding])

  console.log(xVals)

  const svgElement = d3.select(svgRef.current)
  svgElement.selectAll('*').remove()

  const svg = svgElement
    .append('g')

  svg.selectAll('rect')
    .data(episodes.episodes)
    .enter()
    .append('rect')
    .attr('x', e=>xScale(e['season_number']*100+e['episode_number']))
    .attr('y', e=>yScale(e['word_counts']['total']))
    .attr("width", width/episodes.episodes.length)
    .attr("height", e=> yScale(0)-yScale(e['word_counts']['total']))
    .attr("fill", "#B6C649")


  return <svg 
    ref={svgRef} 
    width={width} 
    height={height}
  />
}

export default BarChart