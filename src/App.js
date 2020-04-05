import React, { useState, useEffect } from 'react'
import { NovelCovid } from 'novelcovid'
import Header from './components/Header/Header'
import Filter from './components/Filter/Filter'
import ListItem from './components/ListItem/ListItem'
import GlobalStats from './components/GlobalStats/GlobalStats'
import StatsSummary from './components/StatsSummary/StatsSummary'
import Footer from './components/Footer/Footer'

const App = () => {
  const [globalData, setGlobalData] = useState(null)
  const [countriesData, setCountriesData] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const [hideDeaths, setHideDeaths] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState({ first: true })

  const covid = new NovelCovid()
  const threshold = 1000 // Only show countries with more than X cases

  useEffect(() => {
    (async () => {
      try {
        // Current country data
        const countries = await covid.countries()
        const countriesCalculted = getCountriesCalculations(countries)

        // Historical country data
        const countriesHistorical = await getHistorical(countriesCalculted)
        const countriesHistoricalFiltered = filterLastWeek(countriesHistorical)
        const mergedData = mergeData(countriesCalculted, countriesHistoricalFiltered, countriesHistorical)

        // Global data
        const global = await covid.all()
        const globalCalculted = getAllCalculations(global, mergedData)

        // Set state
        setCountriesData(mergedData.slice().sort((a, b) => (a.recoveredPercent < b.recoveredPercent) ? 1 : -1))
        setGlobalData(globalCalculted)
      } catch(e) {
        setError("Something went wrong when contacting the API, please try again later.")
        console.log(e)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getPercent = (value1, value2, value3) => value1 / (value2 - value3) * 100

  const setSearchFilter = filter => {
    const formattedFilter = filter.charAt(0).toUpperCase() + filter.slice(1)
    setFilterInput(formattedFilter)
  }

  const getHistorical = async countries => {
    const promises = await countries.map(async country => await covid.historical(null, country.country))
    return await Promise.all(promises)
  }

  const filterLastWeek = countries => {
    const countriesArray = []
    const amountOfDays = 7 // Number of days back in time to return
    countries.forEach(country => {
      const arr = []
      for (let key in country.timeline.deaths) {
        if (country.timeline.deaths.hasOwnProperty(key)) {
          arr.push(country.timeline.deaths[key])
        }
      }
      countriesArray.push(arr.slice(arr.length - amountOfDays))
    })
    return countriesArray
  }

  const mergeData = (countryData, historicalData, historicalAll) => {
    const arr = []
    countryData.forEach((country, i) => {
      let daysWithoutDeaths = 0
      let recoveredYesterday
      let recoveredDifference

      historicalData[i].reverse().forEach((item, index) => {
        if (item === historicalData[i][0] && index !== 0 && item !== historicalData[i][index+1]) {
          daysWithoutDeaths = index+1
        }
      })

      historicalAll.forEach(c => {
        if (country.country.toUpperCase() === c.country.toUpperCase()) {
          const deaths = Object.values(c.timeline.deaths)[Object.values(c.timeline.deaths).length-1]
          const cases = Object.values(c.timeline.cases)[Object.values(c.timeline.cases).length-1]
          const recovered = Object.values(c.timeline.recovered)[Object.values(c.timeline.recovered).length-1]

          recoveredYesterday = getPercent(recovered, cases, deaths)
          recoveredDifference = Math.abs(country.recoveredPercent - recoveredYesterday)
        }
      })

      arr.push({ ...country, historicalData: historicalData[i], daysWithoutDeaths, recoveredYesterday, recoveredDifference })
    })
    return arr
  }

  const getAllCalculations = (data, countriesData) => {
    const updated = new Date(data.updated).toLocaleString('sv-SE')
    const recoveredPercent = getPercent(data.recovered, data.cases, data.deaths)
    const mostRecovered = countriesData.sort((a,b) => b.recoveredPercent - a.recoveredPercent).slice(0, 3)
    const noDeaths = countriesData.filter(item => item.daysWithoutDeaths > 0 && item.todayDeaths === 0)
    const criticalLessThanFive = countriesData.filter(item => item.nonCriticalPercent > 95).length / countriesData.length * 100
    const recoveredMostDifference = countriesData.filter(item => item.recoveredYesterday > 0 && item.recoveredYesterday !== item.recoveredPercent).sort((a,b) => b.recoveredDifference - a.recoveredDifference)[0]

    return { ...data, recoveredPercent, updated, mostRecovered, noDeaths, criticalLessThanFive, recoveredMostDifference }
  }

  const getCountriesCalculations = data => {
    const updated = []
    data.forEach(item => {
      if (item.cases > threshold) {
        const recoveredPercent = getPercent(item.recovered, item.cases, item.deaths)
        const criticalPercent =  getPercent(item.critical, item.cases, item.deaths)
        const nonCriticalPercent = 100 - criticalPercent
        const activePercent =  getPercent(item.active, item.cases, item.deaths)

        updated.push({ ...item, recoveredPercent, criticalPercent, nonCriticalPercent, activePercent })
      }
    })
    return updated
  }

  return (
    <div className="container">
      <Header />

      <GlobalStats
        countriesData={countriesData}
        hideDeaths={hideDeaths}
        globalData={globalData}
        error={error} />

      {globalData &&
        <StatsSummary
          globalData={globalData}
          threshold={threshold} />
      }

      {countriesData &&
        <Filter
          countriesState={countriesData}
          hide={setHideDeaths}
          hideDeaths={hideDeaths}
          setFilter={setActiveFilter}
          sortCountriesData={setCountriesData}
          activeFilter={activeFilter}
          threshold={threshold}
          setSearchFilter={setSearchFilter} />
      }

      {countriesData &&
        <ul className="list resetList componentSpacing"> {
          countriesData
            .filter(c => c.country.includes(filterInput))
            .map((item, i) => <ListItem itemData={item} activeFilter={activeFilter} hideDeaths={hideDeaths} key={i} />)
        } </ul>
      }

      <div className="listNotice">
        <a href="https://github.com/NovelCOVID/API" target="_blank" alt="Link to Github" rel="noopener noreferrer">Data sources</a>
      </div>

       <Footer />
    </div>
  )
}

export default App
