import React from 'react'

const GlobalStats = props => (
  <div className="globalStats componentSpacing">
    <div className="globalStatsTextWrapper">
      <div className="globalStats-total"><strong>Total cases:</strong> {props.globalData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      <div className="globalStats-recovered"><strong>Recovered:</strong> <span className="highlighted">{props.globalData.recoveredPercent.toFixed(2)}%</span></div>
      { !props.hideDeaths &&
        <div className="globalStats-deaths"><strong>Deaths:</strong> {props.globalData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      }
      <div className="globalStats-updated"><strong>Updated:</strong> {props.globalData.updated}</div>
    </div>
  </div>
)

export default GlobalStats
