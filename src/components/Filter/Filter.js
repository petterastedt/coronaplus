import React from 'react'
import Search from './../Search/Search'

const Filter = ({countriesState, hide ,hideDeaths, setFilter, sortCountriesData, activeFilter, threshold, setSearchFilter}) => {
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
          aria-label="Toggle death statistics"
          defaultChecked={false} 
          onChange={() => {
            hide(!hideDeaths)
          }
        } />
        <span>Show deaths</span>
      </div>
      <div className="filterListWrapper">
        <div className="filterListSearchWrapper">
          <div className="filterCategoriesWrapper">
            <span className="filterList-label">Sort by: </span>
            <ul className="filterList resetList">
              <li className={`filterList-item ${activeFilter.first ? "filterList-item--active" : ""}`}
                onClick={() => {
                  let sorted = sort(countriesState, 'sortByRecovered')
                  let newFilter = {
                    first: true,
                    second: false,
                    third: false,
                    fourth: false
                  }
                  sortCountriesData(sorted)
                  setFilter(newFilter)
                }
              }>Recovered</li>

              <li className={`filterList-item ${activeFilter.second ? "filterList-item--active" : ""}`}
                onClick={() => {
                  let sorted = sort(countriesState, 'sortByNonCritical')
                  let newFilter = {
                    first: false,
                    second: true,
                    third: false,
                    fourth: false
                  }
                  sortCountriesData(sorted)
                  setFilter(newFilter)
                }
              }>Mild cases</li>

              <li className={`filterList-item ${activeFilter.third ? "filterList-item--active" : ""}`}
                onClick={() => {
                  let sorted = sort(countriesState, 'sortByName')
                  let newFilter = {
                    first: false,
                    second: false,
                    third: true,
                    fourth: false
                  }
                  sortCountriesData(sorted)
                  setFilter(newFilter)
                }
              }>Country</li>

              <li className={`filterList-item ${activeFilter.fourth ? "filterList-item--active" : ""}`}
                onClick={() => {
                  let sorted = sort(countriesState, 'sortByCases')
                  let newFilter = {
                    first: false,
                    second: false,
                    third: false,
                    fourth: true
                  }
                  sortCountriesData(sorted)
                  setFilter(newFilter)
                }
              }>Total cases</li>
            </ul>
          </div>
          <Search
            searchFilter={(filter) => setSearchFilter(filter)} />
        </div>
        <span className="filterList-subtitle">Only showing countries with over {threshold} cases</span>
      </div>
    </div>
  )
}

export default Filter