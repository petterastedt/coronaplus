import React, { useState } from 'react'

const Filter = props => {
  const [activeFilter, setActiveFilter] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false
  })

  const sort = (countries, action) => {
    console.log("state", countries)
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
          defaultChecked={true} 
          onChange={() => {
            props.hide(!props.hideDeaths)
          }
        } /> 
        <span>Hide deaths</span>
      </div>

      <ul className="filterList resetList">
        <li className={`filterList-item ${activeFilter.first ? "filterList-item--active" : ""}`}
          onClick={() => {
            let sorted = sort(props.countriesState, 'sortByRecovered')
            props.sortCountriesData(sorted)
            setActiveFilter({
              first: true,
              second: false,
              third: false,
              fourth: false
            })
          }
        }>Recovered</li>

        <li className={`filterList-item ${activeFilter.second ? "filterList-item--active" : ""}`}
          onClick={() => {
            let sorted = sort(props.countriesState, 'sortByNonCritical')
            props.sortCountriesData(sorted)
            setActiveFilter({
              first: false,
              second: true,
              third: false,
              fourth: false
            })
          }
        }>Non-critical</li>

        <li className={`filterList-item ${activeFilter.third ? "filterList-item--active" : ""}`}
          onClick={() => {
            let sorted = sort(props.countriesState, 'sortByName')
            props.sortCountriesData(sorted)
            setActiveFilter({
              first: false,
              second: false,
              third: true,
              fourth: false
            })
          }
        }>Country</li>

        <li className={`filterList-item ${activeFilter.fourth ? "filterList-item--active" : ""}`}
          onClick={() => {
            let sorted = sort(props.countriesState, 'sortByCases')
            props.sortCountriesData(sorted)
            setActiveFilter({
              first: false,
              second: false,
              third: false,
              fourth: true
            })
          }
        }>Total cases</li>
      </ul>
    </div>
  )
}

export default Filter