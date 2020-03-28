import React, { useState, useEffect } from 'react'
import covid from 'novelcovid'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'
import Filter from './components/Filter/Filter'
import ListItem from './components/ListItem/ListItem'
import GlobalStats from './components/GlobalStats/GlobalStats'

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
      let mergedData = mergeData(countriesCalculted, historicalDataFiltered)
      console.log(mergedData)
      setCountriesData(mergedData.slice().sort((a, b) => (a.recoveredPercent < b.recoveredPercent) ? 1 : -1))

      let all = await covid.getAll()
      let allCalculted = getAllCalculations(all)

      setGlobalData(allCalculted)
    }
    fetchData()
  }, [])

  const sortCountriesData = sorted => setCountriesData(sorted)
  const hide = value => setHideDeaths(value)
  const setFilter = filter => setActiveFilter(filter)

  const mergeData = (countryData, historicalData) => {
    let arr = []

    countryData.forEach((country, i) => {
      let daysWithoutDeaths = 0
      historicalData[i].forEach((item, index) => {
        if (item === historicalData[i][0] && index !== 0 && historicalData[i][index+1] !== item) {
          daysWithoutDeaths = index+1
        }
      })
      let updatedItem = { ...country, historicalData: historicalData[i].reverse(), daysWithoutDeaths }
      arr.push(updatedItem)
    })
    return arr
  }

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

  const getAllCalculations = data => {
    let updated = new Date(data.updated).toLocaleString('sv-SE')
    let recoveredPercent = (data.recovered / data.cases) * 100
    let calculated = { ...data, recoveredPercent, updated }
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
        hideDeaths={hideDeaths}
        globalData={globalData} />

      {countriesData &&
        <Filter
          countriesState={countriesData}
          hide={hide}
          hideDeaths={hideDeaths}
          setFilter={setFilter}
          sortCountriesData={sortCountriesData} 
          activeFilter={activeFilter}/>
      }

      {countriesData ?
        <ul className="list resetList componentSpacing"> {
          countriesData.map((item, i) => <ListItem itemData={item} activeFilter={activeFilter} hideDeaths={hideDeaths} key={i} />)
        } </ul>
        :
        <Loading />
      }
    </div>
  )
}

export default App
