import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions.js';
import classes from './Forecast.module.css';

const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e) {
    e.preventDefault();

    if (city.length === 0) {
        return setError(true);
    }

    // Clear state in preparation for new data
   setError(false);
   setResponseObj({});
  
   setLoading(true);
  
   let uriEncodedCity = encodeURIComponent(city);

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "20de8d20bbmsh229c14228f4b852p1c31ddjsn69bc27cb251c",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
    })
    
    .then(response => response.json())
    .then(response => {
               if (response.cod !== 200) {
           throw new Error()
       }
       setResponseObj(response);
       setLoading(false);
    })
    .catch(err => {
        setError(true);
       setLoading(false);
       console.log(err.message);
    });
   }
   return (
    <div className={classes.box}>
           <h2>What's the Weather Like in Your City?</h2>
           <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={classes.textInput}
                    />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>
                <button className={classes.Button} type="submit">Get Forecast</button>
            </form>
            <Conditions
              responseObj={responseObj}
              error={error}
              loading={loading}
              />
       </div>
   )
}
export default Forecast;
