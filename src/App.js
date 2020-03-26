import React, { useState, useEffect } from 'react'
import covid from 'novelcovid'
import Loading from './components/Loading/Loading'
import Filter from './components/Filter/Filter'
import ListItem from './components/ListItem/ListItem'
import GlobalStats from './components/GlobalStats/GlobalStats'

function App() {
  const [globalData, setGlobalData] = useState(null)
  const [countriesData, setCountriesData] = useState([])
  const [hideDeaths, setHideDeaths] = useState(true)

  useEffect(() => {
    async function fetchData() { 
      let countries = await covid.getCountry({sort: 'recovered'})

      let countriesCalculted = getCountriesCalculations(countries)
      setCountriesData(countriesCalculted.slice().sort((a, b) => (a.recoveredPercent < b.recoveredPercent) ? 1 : -1))

      let all = await covid.getAll()
      let allCalculted = getAllCalculations(all)
      console.log(allCalculted)
      setGlobalData(allCalculted)
    }
    fetchData()
  }, [])

  const sortCountriesData = sorted => setCountriesData(sorted)

  const hide = value => setHideDeaths(value)

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

      { globalData ?
        <GlobalStats
          hideDeaths={hideDeaths}
          globalData={globalData} />
        :
        <Loading />
      }

      { countriesData &&
        <Filter
          countriesState={countriesData}
          hide={hide}
          hideDeaths={hideDeaths}
          sortCountriesData={sortCountriesData} />
      }

      { countriesData ?
        <ul className="list resetList"> {
          countriesData.map((item, i) => <ListItem itemData={item} hideDeaths={hideDeaths} key={i} />)
        } </ul>
        :
        <Loading /> 
      }
    </div>
  );
}

export default App;
