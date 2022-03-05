import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FullCountryInfo from './components/FullCountryInfo'
import ShortCountryInfo from './components/ShortCountryInfo'

const App = ()  => {

  const [searchName, setSearchName] = useState('')
  const [countryData, setCountryData] = useState([])

  const handleSearchChange = (e) => {
    setSearchName(e.target.value)
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
    .then(res => setCountryData(res.data))
    .catch(err => console.log(err))
  },[])

  const filteredCountries = countryData.filter(country => country.name.common.toLowerCase().startsWith(searchName.toLowerCase()))

  const handleCountryClick = (name) => {
    setSearchName(name)
  }

  const renderyData = () => {

    const lenght = filteredCountries.length

    if(lenght === 0) return <p>No country matches the search</p>
    if(lenght === 1) return <FullCountryInfo country={filteredCountries[0]} />
    if(lenght < 11 && lenght > 1 )  return filteredCountries.map(country => <ShortCountryInfo country={country} key={country.cca2} handleCountryClick={handleCountryClick}/>)
    else return <p>Too many countries match the search. Make it more specific</p>
  }

  return (
    <div className="App">
      <h1>Country Info</h1>
      <div>
        Filter: <input value={searchName} onChange={handleSearchChange}></input>
      </div>
      {renderyData()}
    </div>
  );

}

export default App;
