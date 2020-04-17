import React from 'react'

const ListItem = props => (
  <li className="listItem">
      <div className="listItem-titleWrapper">
        <div className="listItem-title">
          <span className="listItem-flag">
            <img src={props.itemData.countryInfo.flag}
              alt={`Flag of ${props.itemData.country}`}
              title={`Flag of ${props.itemData.country}`}
              key={props.i}
              className="listItem-flag"
              loading="lazy"/>
          </span>
          <h2 className="listItem-countryname">{props.itemData.country}</h2>
        </div>
        <div className="listItem-alertWrapper">
          { props.itemData.todayDeaths === 0 && props.itemData.todayCases === 0 &&
            <div className="listItem-noData highlighted highlightTag">No new data since yesterday</div>
          }
          { props.itemData.todayDeaths === 0 && props.itemData.todayCases > 0 &&
            <div className="listItem-noDeaths highlighted highlightTag">No reported deaths today!</div>
          }
          { props.itemData.daysWithoutDeaths > 1 && props.itemData.daysWithoutDeaths < 7 && props.itemData.todayDeaths === 0 ? <div className="listItem-noDeaths highlighted highlightTag">No reported deaths the past {props.itemData.daysWithoutDeaths} days!</div>
            : props.itemData.daysWithoutDeaths > 6 && props.itemData.todayDeaths === 0 ? <div className="listItem-noDeaths highlighted highlightTag">No reported deaths in 7+ days!</div>
            : ""
          }
        </div>
      </div>
      <ul className="listItem-stats resetList">
        <li className="recovered listItem-statsItem">
          <span className={`title ${props.activeFilter.first === true ? "listItem--filterIsActive" : ""}`}>
            Recovered:
          </span>
          <div className="listItem-recoveredWrapper">
            <span className={`percent ${props.activeFilter.first === true ? "highlighted" : ""}`}>
              {props.itemData.recoveredPercent.toFixed(2)}%
            </span>
            { props.itemData.recoveredPercent > props.itemData.recoveredYesterday ? <div className="highlighted plus" title="Percent of recovered increased since yesterday">&#8593;</div>
              : props.itemData.recoveredPercent === props.itemData.recoveredYesterday ? <div className="highlighted equal" title="No change since yesterday">-</div>
              : <div className="highlighted minus" title="Percent of recovered decreased since yesterday">&#8595;</div>
            }
            <span>
              ({props.itemData.recovered.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
            </span>
          </div>
        </li>
        <li className="nonCritical listItem-statsItem">
          <span className={`title ${props.activeFilter.second === true ? "listItem--filterIsActive" : ""}`}>
            Mild cases:
          </span>
          <span className={`${props.activeFilter.second === true ? "highlighted" : ""}`}>
            {props.itemData.nonCriticalPercent.toFixed(2)}%
          </span>
        </li>
        <li className="active listItem-statsItem">
          <span className="title">
            Active cases:
          </span>
          {props.itemData.active.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </li>
        <li className="cases listItem-statsItem">
          <span className={`title ${props.activeFilter.fourth === true ? "listItem--filterIsActive" : ""}`}>
            Total cases:
          </span>
          <span className={`${props.activeFilter.fourth === true ? "listItem--filterIsActive" : ""}`}>
            {props.itemData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </li>
          { !props.hideDeaths &&
            <li className="deaths listItem-statsItem">
              <span className="title">
                Total deaths:
              </span>
              <span className="deaths-number">
                {props.itemData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </li>
          }
      </ul>
  </li>
)

export default ListItem
