import React, { useState, useEffect } from "react";
import * as d3 from 'd3';

function BarChart(episodes) {

  const width = 700
  const height = 600
  const padding = {
    top: 90,
    right: 120,
    bottom: 90,
    left: 120,
  }

const yMin = d3.min(episodes, e=>{
  console.log("e", e)
  // e['word_counts']['total']}
  return 2
})
// const yMax = d3.max(episodes, e=>e['word_counts']['total'])
// const snMin = d3.min(episodes, e=>e['season_number'])
// const snMax = d3.max(episodes, e=>e['season_number'])
// const epMin = d3.min(episodes, e=>e['episode_number'])
// const epMax = d3.max(episodes, e=>e['episode_number'])

// const snScale = d3.scaleBand()
//   .domain([snMin, snMax])
//   .range([0, width])

// const epScale = d3.scaleBand()
//   .domain([epMin, epMax])
//   .range([0, width])


  const svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height)

  // svg.axis()
  //   .scale(snScale)
  //   .orient('bottom')
  
  // svg.axis()
  //   .scale(epScale)
  //   .orient('bottom')

  // svg.selectAll('bar')
  //   .data(episodes)
  //   .enter()
  //   .append('bar')

  return ( svg )
}

export default BarChart