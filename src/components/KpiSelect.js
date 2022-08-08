import React, { useState }from "react"

function KpiSelect(){
    const [kpi, setKpi] = useState("wpm")

    return (
        <div>
            <input 
                type="radio" 
                name="kpiOption" 
                id="countOption" 
                value="count"
                onClick={()=>setKpi("count")}
                checked={kpi=="count"}
            />
            <label for="countOption">Count</label>
            <input 
                type="radio" 
                name="kpiOption" 
                id="wpmOption" 
                value="wpm" 
                onClick={()=>setKpi("wpm")}
                checked={kpi=="wpm"}
            />
            <label for="wpmOption">Words per Minute</label>
        </div>
    )
}

export default KpiSelect