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
  const [activeFilter, setActiveFilter] = useState({ first: true })

  const covid = new NovelCovid()
  const threshold = 1000 // Only show countries with more than X cases

  useEffect(() => {
    (async () => {
      // Current country data
      let countries = await covid.countries()
      let countriesCalculted = getCountriesCalculations(countries)

      // Historical country data
      let countriesHistorical = await getHistorical(countriesCalculted)
      let countriesHistoricalFiltered = filterLastWeek(countriesHistorical)
      let mergedData = mergeData(countriesCalculted, countriesHistoricalFiltered, countriesHistorical)

      // Global data
      let global = await covid.all()
      let globalCalculted = getAllCalculations(global, mergedData)

      // Set state
      setCountriesData(mergedData.slice().sort((a, b) => (a.recoveredPercent < b.recoveredPercent) ? 1 : -1))
      setGlobalData(globalCalculted)
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getPercent = (value1, value2, value3) => value1 / (value2 - value3) * 100

  const sortCountriesData = sorted => setCountriesData(sorted)
  const hide = value => setHideDeaths(value)
  const setFilter = filter => setActiveFilter(filter)
  const setSearchFilter = filter => {
    const formattedFilter = filter.charAt(0).toUpperCase() + filter.slice(1)
    setFilterInput(formattedFilter)
  }

  const getHistorical = async countries => {
    const countriesFiltered = countries.filter(country => country.country !== "World")
    console.log(countriesFiltered)

    const promises = await countriesFiltered.map(async country => await covid.historical(null, country.country))
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
    console.log("test", countryData)
    let arr = []
    countryData.forEach((country, i) => {
      let daysWithoutDeaths = 0
      let recoveredYesterday
      let recoveredDifference
      console.log(historicalData[0], i)

      historicalData[i].reverse().forEach((item, index) => {
        if (item === historicalData[i][0] && index !== 0 && item !== historicalData[i][index+1]) {
          daysWithoutDeaths = index+1
        }
      })

      historicalAll.forEach(c => {
        if (country.country.toUpperCase() === c.country.toUpperCase()) {
          let deaths = Object.values(c.timeline.deaths)[Object.values(c.timeline.deaths).length-1]
          let cases = Object.values(c.timeline.cases)[Object.values(c.timeline.cases).length-1]
          let recovered = Object.values(c.timeline.recovered)[Object.values(c.timeline.recovered).length-1]

          recoveredYesterday = getPercent(recovered, cases, deaths)
          recoveredDifference = Math.abs(country.recoveredPercent - recoveredYesterday)
        }
      })

      arr.push({ ...country, historicalData: historicalData[i], daysWithoutDeaths, recoveredYesterday, recoveredDifference })
    })
    return arr
  }

  const getAllCalculations = (data, countriesData) => {
    let updated = new Date(data.updated).toLocaleString('sv-SE')
    let recoveredPercent = getPercent(data.recovered, data.cases, data.deaths)
    let mostRecovered = countriesData.sort((a,b) => b.recoveredPercent - a.recoveredPercent).slice(0, 3)
    let noDeaths = countriesData.filter(item => item.daysWithoutDeaths > 0 && item.todayDeaths === 0)
    let criticalLessThanFive = countriesData.filter(item => item.nonCriticalPercent > 95).length / countriesData.length * 100
    let recoveredMostDifference = countriesData.filter(item => item.recoveredYesterday > 0 && item.recoveredYesterday !== item.recoveredPercent).sort((a,b) => b.recoveredDifference - a.recoveredDifference)[0]

    return { ...data, recoveredPercent, updated, mostRecovered, noDeaths, criticalLessThanFive, recoveredMostDifference }
  }

  const getCountriesCalculations = data => {
    const dataFiltered = data.filter(country => country.country !== "World")

    let updated = []
    dataFiltered.forEach(item => {
      if (item.cases > threshold) {
        let recoveredPercent = getPercent(item.recovered, item.cases, item.deaths)
        let criticalPercent =  getPercent(item.critical, item.cases, item.deaths)
        let nonCriticalPercent = 100 - criticalPercent
        let activePercent =  getPercent(item.active, item.cases, item.deaths)

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
        globalData={globalData} />

      {globalData &&
        <StatsSummary
          globalData={globalData}
          threshold={threshold} />
      }

      {countriesData &&
        <Filter
          countriesState={countriesData}
          hide={hide}
          hideDeaths={hideDeaths}
          setFilter={setFilter}
          sortCountriesData={sortCountriesData} 
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
