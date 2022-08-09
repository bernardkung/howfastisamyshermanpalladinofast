import React, { useState, useEffect }from "react"

function KpiSelect(props){
    const [kpi, setKpi] = useState("")

    // Set default KPI
    useEffect(()=>{
        setKpi(props.kpiType)
    }, [])

    // Set parent KPI hook
    useEffect(()=>{
        props.setKpiType(kpi)
    }, [kpi])

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