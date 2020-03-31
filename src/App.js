import React, { useState, useEffect } from 'react'
import covid from 'novelcovid'
import Header from './components/Header/Header'
import Filter from './components/Filter/Filter'
import ListItem from './components/ListItem/ListItem'
import GlobalStats from './components/GlobalStats/GlobalStats'
import StatsSummary from './components/StatsSummary/StatsSummary'
import Footer from './components/Footer/Footer'

const App = () => {
  const [globalData, setGlobalData] = useState(null)
  const [countriesData, setCountriesData] = useState([])
  const [hideDeaths, setHideDeaths] = useState(true)
  const [activeFilter, setActiveFilter] = useState({ first: true })

  const historyEndpoint = 'https://corona.lmao.ninja/v2/historical/'

  useEffect(() => {
    const fetchData = async () => {
      let countries = await covid.getCountry({ sort: 'cases' })
      let countriesCalculted = getCountriesCalculations(countries)

      let arrOfCountries = await getHistoricalValuesForCountries(countriesCalculted)
      let historicalDataFiltered = filterLast7Days(arrOfCountries)
      let mergedData = mergeData(countriesCalculted, historicalDataFiltered, arrOfCountries)

      setCountriesData(mergedData.slice().sort((a, b) => (a.recoveredPercent < b.recoveredPercent) ? 1 : -1))

      let all = await covid.getAll()
      let allCalculted = getAllCalculations(all, mergedData)

      setGlobalData(allCalculted)
    }
    fetchData()
  }, [])

  const sortCountriesData = sorted => setCountriesData(sorted)
  const hide = value => setHideDeaths(value)
  const setFilter = filter => setActiveFilter(filter)

  const getHistoricalValuesForCountries = async (countries) => {
    const promises = []
    countries.map(country => promises.push(fetch(`${historyEndpoint}${country.country}`).then(r => r.json())))
    return await Promise.all(promises)
  }

  const filterLast7Days = countries => {
    const arrOfCountries = []
    countries.forEach(country => {
      const arr = []
      for (let key in country.timeline.deaths) {
        if (country.timeline.deaths.hasOwnProperty(key)) {
          arr.push(country.timeline.deaths[key])
        }
      }
      arrOfCountries.push(arr.slice(arr.length - 7))
    })
    return arrOfCountries
  }

  const mergeData = (countryData, historicalData, historicalAll) => {
    let arr = []

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
          let deaths = Object.values(c.timeline.deaths)[Object.values(c.timeline.deaths).length-1]
          let cases = Object.values(c.timeline.cases)[Object.values(c.timeline.cases).length-1]
          let recovered = Object.values(c.timeline.recovered)[Object.values(c.timeline.recovered).length-1]

          recoveredYesterday = recovered / (cases - deaths) * 100
          recoveredDifference = Math.abs(country.recoveredPercent - recoveredYesterday)
        }
      })

      let updatedItem = { ...country, historicalData: historicalData[i], daysWithoutDeaths, recoveredYesterday, recoveredDifference }
      arr.push(updatedItem)
    })
    return arr
  }

  const getAllCalculations = (data, countriesData) => {
    let updated = new Date(data.updated).toLocaleString('sv-SE')
    let recoveredPercent = data.recovered / (data.cases - data.deaths) * 100
    let mostRecovered = countriesData.sort((a,b) => b.recoveredPercent - a.recoveredPercent).slice(0, 3)
    let noDeaths = countriesData.filter(item => item.daysWithoutDeaths > 0 && item.todayDeaths === 0)
    let criticalLessThanFive = countriesData.filter(item => item.nonCriticalPercent > 95).length / countriesData.length * 100
    let recoveredMostDifference = countriesData.filter(item => item.recoveredYesterday > 0 && item.recoveredYesterday !== item.recoveredPercent).sort((a,b) => b.recoveredDifference - a.recoveredDifference)[0]


    let calculated = { ...data, recoveredPercent, updated, mostRecovered, noDeaths, criticalLessThanFive, recoveredMostDifference }
    return calculated
  }

  const getCountriesCalculations = data => {
    let updated = []

    data.forEach(item => {
      const threshold = 999 // Only show countries with more than X cases
      if (item.cases > threshold) {
        let recoveredPercent = item.recovered / (item.cases - item.deaths) * 100
        let criticalPercent = item.critical / (item.cases - item.deaths) * 100
        let nonCriticalPercent = 100 - criticalPercent
        let activePercent = item.active / (item.cases - item.deaths) * 100

        let result = { ...item, recoveredPercent, criticalPercent, nonCriticalPercent, activePercent }
        updated.push(result)
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
          globalData={globalData} />
      }

      {countriesData &&
        <Filter
          countriesState={countriesData}
          hide={hide}
          hideDeaths={hideDeaths}
          setFilter={setFilter}
          sortCountriesData={sortCountriesData} 
          activeFilter={activeFilter}/>
      }

      {countriesData &&
        <ul className="list resetList componentSpacing"> {
          countriesData.map((item, i) => <ListItem itemData={item} activeFilter={activeFilter} hideDeaths={hideDeaths} key={i} />)
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
