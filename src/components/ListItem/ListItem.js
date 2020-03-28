import React from 'react'

const ListItem = (props) => (
  <li className="listItem">
      <div className="listItem-titleWrapper">
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
        <div className="listItem-alertWrapper">
          { props.itemData.todayDeaths === 0 && props.itemData.todayCases === 0 &&
            <div className="listItem-noData highlighted highlightTag">No new data since yesterday</div>
          }
          { props.itemData.todayDeaths === 0 && props.itemData.todayCases > 0 &&
            <div className="listItem-noDeaths highlighted highlightTag">No reported deaths today!</div>
          }
          { props.itemData.daysWithoutDeaths > 1 &&
            <div className="listItem-noDeaths highlighted highlightTag">No reported deaths the past {props.itemData.daysWithoutDeaths} days!</div>
          }
        </div>
      </div>
      <ul className="listItem-stats resetList">
        <li className="recovered listItem-statsItem">
          <span className={`${props.activeFilter.first === true ? "listItem--filterIsActive" : ""}`}>Recovered:</span><br /> <span className={`${props.activeFilter.first === true ? "highlighted" : ""}`}>{props.itemData.recoveredPercent.toFixed(2)}%</span> ({props.itemData.recovered.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
        </li>
        <li className="nonCritical listItem-statsItem">
          <span className={`${props.activeFilter.second === true ? "listItem--filterIsActive" : ""}`}>Mild cases:</span><br /> <span className={`${props.activeFilter.second === true ? "highlighted" : ""}`}>{props.itemData.nonCriticalPercent.toFixed(2)}%</span>
        </li>
        <li className="active listItem-statsItem">
          <span className="">Active cases:</span><br />{props.itemData.active.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </li>
        <li className="cases listItem-statsItem">
          <span className={`${props.activeFilter.fourth === true ? "listItem--filterIsActive" : ""}`}>Total cases:</span><br /> <span className={`${props.activeFilter.fourth === true ? "listItem--filterIsActive" : ""}`}>{props.itemData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        </li>
          { !props.hideDeaths &&
            <li className="deaths listItem-statsItem">
              Total deaths:<br /><span className="deaths-number">{props.itemData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </li>
          }
      </ul>
  </li>
)

export default ListItem
