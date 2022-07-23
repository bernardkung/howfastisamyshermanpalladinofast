
import './App.css';
import React, { useState, useEffect } from 'react';

import BarChart from './components/BarChart'


async function loadData() {
  return fetch('data/episodes.json')
    .then(r=>r.json())
    .then(data=>data)
}

function App() {
  
  const [episodes, setEpisodes] = useState([])

  // Load Data
  useEffect(() => {
    loadData()
      .then(d=>setEpisodes(d))
  }, []);

  useEffect(()=>{
    console.log('ep change')
    console.log(episodes)
  }, [episodes])
  

  return (
    <div className="App">
      <div>Hello World</div>
      <div>There are {episodes.length} episodes loaded</div>
      <BarChart />
    </div>
  );
}

export default App;

