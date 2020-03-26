import React from 'react'

const ListItem = (props) => (
  <li className="listItem">
      <div className="listItem-wrapper">
        <div className="listItem-title">
          <span className="listItem-flag">
            <img src={props.itemData.countryInfo.flag}
              alt={`Flag of ${props.itemData.country}`}
              title={`Flag of ${props.itemData.country}`}
              key={props.i}
              className="listItem-flag"/>
          </span>
          <h2>{props.itemData.country}</h2>
        </div>
        <div className="listItem-stats">
          <div className="cases">
            Total cases: {props.itemData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="recovered">
            Recovered: {props.itemData.recovered.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({props.itemData.recoveredPercent.toFixed(2)}%)
          </div>
          <div className="active">
            Active cases: {props.itemData.active.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="nonCritical">
            Non-critical: {props.itemData.nonCriticalPercent.toFixed(2)}%
          </div>
          { !props.hideDeaths &&
            <div className="deaths">
              Total deaths: {props.itemData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          }
          { props.itemData.todayDeaths === 0 && props.itemData.todayCases > 0 &&
            <div className="listItem-noDeaths highlighted">No reported deaths today!</div>
          }
          { props.itemData.daysWithoutDeaths > 1 &&
            <div className="listItem-noDeaths highlighted">No reported deaths the past {props.itemData.daysWithoutDeaths} days!</div>
          }
        </div>
      </div>
  </li>
)

export default ListItem
