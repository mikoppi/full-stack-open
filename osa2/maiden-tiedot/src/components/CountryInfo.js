import axios from "axios";
import React, { useEffect, useState } from "react";

const CountryInfo = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false)
        console.log(response.data)
      });
  },[]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag"></img>
      <h1>Weather in {country.capital}</h1>
       {loading ? null :<>
       <p>temperature {weatherData.main.temp.toFixed(2)} Celcius</p>
       <img alt="weathericon"
            src={
              "http://openweathermap.org/img/wn/" +
              weatherData.weather[0].icon +
              "@2x.png"
            }
          />
       <p>wind {weatherData.wind.speed} m/s</p>
       </>  } 
      
    </div>
  );
};

export default CountryInfo;
