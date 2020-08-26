import React from 'react'

const ListItem = ({itemData, activeFilter, hideDeaths}) => (
  <li className="listItem">
      <div className="listItem-titleWrapper">
        <div className="listItem-title">
          <span className="listItem-flag">
            <img src={itemData.countryInfo.flag}
              alt={`Flag of ${itemData.country}`}
              title={`Flag of ${itemData.country}`}
              className="listItem-flag"
              loading="lazy" />
          </span>
          <h2 className="listItem-countryname">{itemData.country}</h2>
        </div>
        <div className="listItem-alertWrapper">
          { itemData.todayDeaths === 0 && itemData.todayCases === 0 &&
            <div className="listItem-noData highlighted highlightTag">No new data since yesterday</div>
          }
          { itemData.todayDeaths === 0 && itemData.todayCases > 0 &&
            <div className="listItem-noDeaths highlighted highlightTag">No reported deaths today!</div>
          }
          { itemData.daysWithoutDeaths > 1 && itemData.daysWithoutDeaths < 7 && itemData.todayDeaths === 0 ? <div className="listItem-noDeaths highlighted highlightTag">No reported deaths the past {itemData.daysWithoutDeaths} days!</div>
            : itemData.daysWithoutDeaths > 6 && itemData.todayDeaths === 0 ? <div className="listItem-noDeaths highlighted highlightTag">No reported deaths in 7+ days!</div>
            : ""
          }
        </div>
      </div>
      <ul className="listItem-stats resetList">
        <li className="recovered listItem-statsItem">
          <span className={`title ${activeFilter.first === true ? "listItem--filterIsActive" : ""}`}>
            Recovered:
          </span>
          <div className="listItem-recoveredWrapper">
            { itemData.recovered !== 0 ?
              <span className={`percent ${activeFilter.first === true ? "highlighted" : ""}`}>
                {itemData.recoveredPercent.toFixed(2)}%
              </span>
              :
              <strong className="noData">No data </strong>
            }
            { itemData.recoveredPercent > itemData.recoveredYesterday ? <div className="highlighted plus" title="Percent of recovered increased since yesterday"> &#8593;</div>
              : itemData.recoveredPercent === itemData.recoveredYesterday ? <div className="highlighted equal" title="No change since yesterday"> -</div>
              : <div className="highlighted minus" title="Percent of recovered decreased since yesterday"> &#8595;</div>
            }
              <span>
                ({itemData.recovered.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
              </span>
          </div>
        </li>
        <li className="nonCritical listItem-statsItem">
          <span className={`title ${activeFilter.second === true ? "listItem--filterIsActive" : ""}`}>
            Mild cases:
          </span>
          <span className={`${activeFilter.second === true ? "highlighted" : ""}`}>
            {itemData.nonCriticalPercent.toFixed(2)}%
          </span>
        </li>
        <li className="active listItem-statsItem">
          <span className="title">
            Active cases:
          </span>
          {itemData.active.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </li>
        <li className="cases listItem-statsItem">
          <span className={`title ${activeFilter.fourth === true ? "listItem--filterIsActive" : ""}`}>
            Total cases:
          </span>
          <span className={`${activeFilter.fourth === true ? "listItem--filterIsActive" : ""}`}>
            {itemData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </li>
          { !hideDeaths &&
            <li className="deaths listItem-statsItem">
              <span className="title">
                Total deaths:
              </span>
              <span className="deaths-number">
                {itemData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </li>
          }
      </ul>
  </li>
)

export default ListItem
