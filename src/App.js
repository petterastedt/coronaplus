import React, { useState, useEffect } from 'react'
import covid from 'novelcovid'
import Loading from './components/Loading/Loading'
import Filter from './components/Filter/Filter'
import ListItem from './components/ListItem/ListItem'
import GlobalStats from './components/GlobalStats/GlobalStats'

function App () {
  const [globalData, setGlobalData] = useState(null)
  const [countriesData, setCountriesData] = useState([])
  const [countriesHistoricalData, setCountriesHistoricalData] = useState([])
  const [hideDeaths, setHideDeaths] = useState(true)

  const historyEndpoint = 'https://corona.lmao.ninja/v2/historical/'

  useEffect(() => {
    const fetchData = async () => {
      let countries = await covid.getCountry({ sort: 'recovered' })

      let countriesCalculted = getCountriesCalculations(countries)
      const arrOfCountries = await getHistoricalValuesForCountries(countriesCalculted).then(countries => filterLast7Days(countries))
      setCountriesHistoricalData(arrOfCountries)
      setCountriesData(countriesCalculted.slice().sort((a, b) => (a.recoveredPercent < b.recoveredPercent) ? 1 : -1))

      let allCalculted = await covid.getAll().then(all => getAllCalculations(all))
      console.log(allCalculted)
      setGlobalData(allCalculted)
    }
    fetchData()
  }, [])

  const sortCountriesData = sorted => setCountriesData(sorted)

  const hide = value => setHideDeaths(value)

  const getHistoricalValuesForCountries = async (countries) => {
    const promises = []
    countries.map(country => promises.push(fetch(`${historyEndpoint}${country.country}`).then(r => r.json())))
    return await Promise.all(promises)
  }

  const filterLast7Days = countries => {
    const arrOfCountries = []
    countries.forEach(country => {
      const arr = []
      for (let key in country.timeline.cases) {
        if (country.timeline.cases.hasOwnProperty(key)) {
          arr.push(country.timeline.cases[key])
        }
      }
      arrOfCountries.push(arr.slice(arr.length - 7))
    })
    console.log(arrOfCountries)
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

      {globalData ?
        <GlobalStats
          hideDeaths={hideDeaths}
          globalData={globalData} />
        :
        <Loading />
      }

      {countriesData &&
        <Filter
          countriesState={countriesData}
          hide={hide}
          hideDeaths={hideDeaths}
          sortCountriesData={sortCountriesData} />
      }

      {countriesData ?
        <ul className="list resetList componentSpacing"> {
          countriesData.map((item, i) => <ListItem itemData={item} hideDeaths={hideDeaths} key={i} />)
        } </ul>
        :
        <Loading />
      }
    </div>
  )
}

export default App
