
import './App.css';
import React, { useState, useEffect } from 'react';

import BarChart from './components/BarChart'
import KpiSelect from './components/KpiSelect'


async function loadData(url) {
  return fetch(url)
    .then(r=>r.json())
    .then(data=>data)
}

function App() {
  
  const [episodes, setEpisodes] = useState([])
  const [kpiType, setKpiType] = useState("count")

  // Load Data
  useEffect(() => {
    const url = 'data/data.json'
    loadData(url)
      .then(d=>setEpisodes(d))
  }, []);

  useEffect(()=>{
    console.log('ep change')
    console.log(episodes)

    // episodes.forEach(e => console.log(e['word_counts']['total']))
  }, [episodes])
  

  return (
    <div className="App">
      <div>Hello World</div>
      <div>There are {episodes.length} episodes loaded</div>
      <KpiSelect kpiType={kpiType} setKpiType={setKpiType}/>
      <BarChart episodes={episodes} kpiType={kpiType}/>
    </div>
  );
}

export default App;

