import React, { useState, useEffect} from 'react'
import axios from "axios"

const CountryWeather = ({data}) => {

    if (data === false) {
        return <p>Failed to get weather</p>
    }
    else return(
        <>
            <h3>Weather of Finland</h3>
            <p>Temperature {data.main.temp} °C</p>
            <p>Feels like {data.main.feels_like} °C</p>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={`Weather: ${data.weather[0].description}`} />
            <p>Wind {data.wind.speed} m/s</p>
        </>
    )
}

const FullCountryInfo = ({ country }) => {

    const [data, setData] = useState(false)
  
    const api_key = process.env.REACT_APP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric&lang=en`
  
    useEffect(() => {
      axios.get(url)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    },[])
  
    return (
      <>
        <h2>{country.name.common}</h2>
        <br />
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <br/>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{(language)}</li>)}
        </ul>
        <img src={country.flags.png} alt={`The flag of ${country.name.common}`}></img>
        <CountryWeather data={data} />
      </>
    )
  }

export default FullCountryInfo