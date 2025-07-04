import React, { useState } from 'react'
import axios  from 'axios'
import './weather.css';

 export default function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCityChange =(event) => {
        setCity(event.target.value);
    }

    const fetchWeather = async () =>{
      if (!city.trim()) return;
      setLoading(true);
      setError('');
  

        try{
         const response =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=8911320113dcf2b4c9af47be9703da71`);
        setWeather(response.data);
        }
        catch (error) {
          setError("City not found or API errror.");
          setWeather(null);
        } finally{
          setLoading(false);
        }
    }
    
  return (
    <div className='weather-container'>
     <div className='weather-box'> <input type='text' placeholder='Enter City Names' value={city} onChange={handleCityChange}/>
     
     <button onClick={fetchWeather}>Get Weather</button>
     {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div className='weather-info'>
          <h2>{weather.name}</h2>
          <p>Temp is {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
    alt='weather icon'/>
        </div>
      )}
    </div>
    </div>
  )
}

