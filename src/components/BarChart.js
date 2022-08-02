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

  const yMin = d3.min(episodes.episodes, e=>e['word_counts']['total'])
  const yMax = d3.max(episodes.episodes, e=>e['word_counts']['total'])
  const yScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([height-padding.top, padding.bottom])

  const xVals = d3.map(episodes.episodes, e=>e['season_number']*100+e['episode_number'])
  const xScale = d3.scaleBand()
    .domain(xVals)
    .range([padding.left, width-padding.right])

  const tooltip = d3.select('body').append('div')
    .attr('id', 'tooltip')

  const mouseover = (e, d, i)=>{
    let x = e.pageX
    let y = e.target.getBoundingClientRect().top

    let tooltipHtml = `<strong>${d['season_number']}x${d['episode_number']} - ${d['title']}</strong><br>
      ${d['word_counts']['total']}`

    tooltip
      // Add text
      .html(tooltipHtml)
      // Positioning
      .style('left', x + 'px')
      .style('top', y + 'px')
      .style('opacity', 0.9)
      // Data attributes
      .attr('data-season-number', d['season_number'])
      .attr('data-episode-number', d['episode_number'])
      .attr('data-title', d['title'])
      .attr('data-word-count', d['word_counts']['total'])

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
    .attr('x', e=>xScale(e['season_number']*100+e['episode_number']))
    .attr('y', e=>yScale(e['word_counts']['total']))
    .attr("width", width/episodes.episodes.length)
    .attr("height", e=> yScale(0)-yScale(e['word_counts']['total']))
    .attr("fill", colors[0])
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