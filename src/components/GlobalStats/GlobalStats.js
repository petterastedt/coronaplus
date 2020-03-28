import React from 'react'
import CountUp from 'react-countup';
import Loading from './../Loading/Loading'


const GlobalStats = props => (
  <div className="globalStats componentSpacing">
    <div className="globalStatsTextWrapper">
      <div className="globalStats-total">
        <strong>Total cases: </strong>
        { props.globalData ? 
          <span>{props.globalData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> :
          <Loading />
        }
          {}
      </div>
      <div className="globalStats-recovered highlighted">
        <strong>Recovered: </strong>
        { props.globalData ? 
          <span>{props.globalData.recovered.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> :
          <Loading />
        }
        { props.globalData && 
         <span className="highlighted globalStats-recoveredNumber">
          (<CountUp 
            end={props.globalData.recoveredPercent}
            separator=","
            suffix="%"
            delay={0.3}
            decimals={2}
            duration={3.2} />)
          </span>
        }
      </div>
        { !props.hideDeaths &&
          <div className="globalStats-deaths">
            <strong>Deaths: </strong>
            <span>{props.globalData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
        }
      <div className="globalStats-updated">
        <strong>Updated: </strong>
        { props.globalData ? 
          <span>{props.globalData.updated}</span> :
          <Loading />
        }
      </div>
    </div>
  </div>
)

export default GlobalStats
