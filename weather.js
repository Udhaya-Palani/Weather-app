import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';
import  'bootstrap/dist/css/bootstrap.css';

export function Climate() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '10d0856f549c63283f2d565585a81f5b';

  useEffect(() => {
    if (location) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [location]);

  const handleSubmit = e => {
    e.preventDefault();
    setLocation(e.target.location.value);
  };

  return (
    <div className='container-fluid mt-5'>
      <div className='row '>
        <div className='col-lg-12'>
      
        <div className="weather text-center mt-5">
          <form onSubmit={handleSubmit}>
          <label htmlFor="location" className='text-white'>Enter a location:</label>
          <input  className='location'type="text" id="location" name="location" />
          <button className='button'  type="submit">Get Weather</button>
          </form>
      {weatherData && (
        <>
          <h3 className='text-info mt-3'>Current Weather for {weatherData.name}</h3>
          <h4 className='text-danger'>Temperature: {weatherData.main.temp} &deg;C</h4>
          <h5 className='text-warning'>Feels Like: {weatherData.main.feels_like} &deg;C</h5>
          <p>Description: {weatherData.weather[0].description}</p>
        </>
      )}
        </div>
         </div>
      </div>
    </div>
  );
}