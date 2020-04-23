import React from 'react'
import CountUp from 'react-countup';
import Loading from '../Loading/Loading'

const GlobalStats = ({hideDeaths, globalData, error}) => (
  <div className="globalStats componentSpacing">
    { error ? <div className="error">{error}</div>
    :
      <div className="globalStatsTextWrapper">
        <div className="globalStats-total">
          <strong>Total cases: </strong>
          { globalData ?
            <span>{globalData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> :
            <Loading />
          }
            {}
        </div>
        <div className="globalStats-recovered highlighted">
          <strong>Recovered: </strong>
          { globalData ?
            <span>{globalData.recovered.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> :
            <Loading />
          }
          { globalData &&
            <span className="highlighted globalStats-recoveredNumber">
              (<CountUp
                end={globalData.recoveredPercent}
                separator=","
                suffix="%"
                delay={0.3}
                decimals={2}
                duration={3.2} />)
            </span>
          }
          { globalData &&
            <div className="globalStats-indicator">
              { globalData.recoveredPercent > globalData.recoveredPercentYesterday ? <div className="highlighted plus" title="Percent recovered increased since yesterday">&#8593;</div>
                : globalData.recoveredPercent === globalData.recoveredYesterday ? <div className="highlighted equal" title="No change since yesterday">-</div>
                : <div className="highlighted minus" title="Percent recovered decreased since yesterday">&#8595;</div>
              }
            </div>
          }
        </div>
          { !hideDeaths &&
            <div className="globalStats-deaths">
              <strong>Deaths: </strong>
              <span>{globalData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </div>
          }
        <div className="globalStats-updated">
          <strong>Updated: </strong>
          { globalData ?
            <span>{globalData.updated}</span> :
            <Loading />
          }
        </div>
        { !globalData &&
          <div className="globalStats-warning">Loading times might be longer than usual due to high preassure on the API, hang on.</div>
        }
      </div>
    }
  </div>
)

export default GlobalStats
