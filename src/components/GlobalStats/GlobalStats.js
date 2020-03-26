import React from 'react'

const GlobalStats = props => (
  <div className="globalStats">
    <div className="globalStats-total"><strong>Total cases:</strong> {props.globalData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
    <div className="globalStats-recovered"><strong>Recovered:</strong> {props.globalData.recoveredPercent.toFixed(2)}%</div>
    { !props.hideDeaths &&
      <div className="globalStats-deaths"><strong>Deaths:</strong> {props.globalData.deaths}</div>
    }
    <div className="globalStats-updated"><strong>Updated:</strong> {props.globalData.updated}</div>
  </div>
)

export default GlobalStats
