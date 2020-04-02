import React from 'react'
import Search from './../Search/Search'

const Filter = props => {
  const sort = (countries, action) => {
    switch(action) {
      case 'sortByNonCritical':
        return countries.slice().sort((a, b) => (a.nonCriticalPercent < b.nonCriticalPercent) ? 1 : -1)
      case 'sortByName':
        return countries.slice().sort((a, b) => (a.country > b.country) ? 1 : -1)
        case 'sortByCases':
        return countries.slice().sort((a, b) => (a.cases < b.cases) ? 1 : -1)
      case 'sortByRecovered':
        return countries.slice().sort((a, b) => (a.recoveredPercent < b.recoveredPercent) ? 1 : -1)
      default:
        return countries.slice().sort((a, b) => (a.recoveredPercent < b.recoveredPercent) ? 1 : -1)
    }
  }

  return (
    <div className="filter">
      <div className="filter-checkbox">
        <input type="checkbox"
          defaultChecked={false} 
          onChange={() => {
            props.hide(!props.hideDeaths)
          }
        } />
        <span>Show deaths</span>
      </div>
      <div className="filterListWrapper">
        <div className="filterListSearchWrapper">
          <Search
            searchFilter={(filter) => props.setSearchFilter(filter)} />

          <div className="filterCategoriesWrapper">
            <span className="filterList-label">Sort by: </span>
            <ul className="filterList resetList">
              <li className={`filterList-item ${props.activeFilter.first ? "filterList-item--active" : ""}`}
                onClick={() => {
                  let sorted = sort(props.countriesState, 'sortByRecovered')
                  let newFilter = {
                    first: true,
                    second: false,
                    third: false,
                    fourth: false
                  }
                  props.sortCountriesData(sorted)
                  props.setFilter(newFilter)
                }
              }>Recovered</li>

              <li className={`filterList-item ${props.activeFilter.second ? "filterList-item--active" : ""}`}
                onClick={() => {
                  let sorted = sort(props.countriesState, 'sortByNonCritical')
                  let newFilter = {
                    first: false,
                    second: true,
                    third: false,
                    fourth: false
                  }
                  props.sortCountriesData(sorted)
                  props.setFilter(newFilter)
                }
              }>Mild cases</li>

              <li className={`filterList-item ${props.activeFilter.third ? "filterList-item--active" : ""}`}
                onClick={() => {
                  let sorted = sort(props.countriesState, 'sortByName')
                  let newFilter = {
                    first: false,
                    second: false,
                    third: true,
                    fourth: false
                  }
                  props.sortCountriesData(sorted)
                  props.setFilter(newFilter)
                }
              }>Country</li>

              <li className={`filterList-item ${props.activeFilter.fourth ? "filterList-item--active" : ""}`}
                onClick={() => {
                  let sorted = sort(props.countriesState, 'sortByCases')
                  let newFilter = {
                    first: false,
                    second: false,
                    third: false,
                    fourth: true
                  }
                  props.sortCountriesData(sorted)
                  props.setFilter(newFilter)
                }
              }>Total cases</li>
            </ul>
          </div>
        </div>
        <span className="filterList-subtitle">Only showing countries with over {props.threshold} cases</span>
      </div>
    </div>
  )
}

export default Filter