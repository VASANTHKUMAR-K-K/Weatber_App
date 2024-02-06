import './App.css';
import React, { useState, useEffect } from 'react';
import Weatherdatails from './Components/Weatherdatails';
import PropsTypes from "prop-types";

//IMPORT IMAGES
import searchicon from './Weather icons/glass.png';
import snowIcon from './Weather icons/snow.png';
import sunIcon from './Weather icons/sun.png';
import drizzleIcon from './Weather icons/clouds.png';
import rainIcon from './Weather icons/raining.png';
import cloudyIcon from './Weather icons/sun.png';

const weatherIconmap={
    "01d": sunIcon,
    "01n": sunIcon,
    "02d": cloudyIcon,
    "02n": cloudyIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
}

Weatherdatails.propsTypes={
  icon: PropsTypes.string.isRequired,
  temp: PropsTypes.number.isRequired,
  city: PropsTypes.string.isRequired,
  country: PropsTypes.string.isRequired,
  humidity: PropsTypes.number.isRequired,
  wind: PropsTypes.number.isRequired,
  lat: PropsTypes.number.isRequired,
  log: PropsTypes.number.isRequired,
}


function App() {
  let api_key="fa4dd547d78e502b020d0d5c14a87b7c";
const [text,setText]=useState("Madurai");
const[icon,setIcon]=useState(snowIcon);
const[temp,setTemp]=useState(0);
const[city,setCity]=useState("");
const[country,setCountry]=useState("");
const[lat,setLat]=useState(0);
const[log,setLon]=useState(0);
const[humidity,setHumidity]=useState(0);
const[wind,setWind]=useState(0);

const [cityNotfound,setCitynotfound]=useState(false);
const [loading,setLoading]=useState(false);
 const [error,setError]=useState(null);

const search=async () => {
    setLoading(true);
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

  try {
    let res=await fetch(url);
    let data=await res.json();
    //console.log(data)
    if(data.cod === "404"){
      console.log("City not found");
      setCitynotfound(true);
      setLoading(false);
      return;
    }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLon(data.coord.lon)
    const weatherIconCode=data.weather[0].icon;
    setIcon(weatherIconmap[weatherIconCode] || sunIcon);
    setCitynotfound(false);
  } catch (error) {
    console.log("An error occurred",error.message);
    setError("An Error occurred while fetching weather data.");
  }finally{
      setLoading(false)
  }
};


const handleCity= (e)=>{
  // console.log(e.target.value)
    setText(e.target.value)
};
const handleKeyDown= (e)=>{
  if(e.key==="Enter"){
  search();
  }
}

useEffect(function () {
  search();
},[]);

  return (
    <div className="container">
      <div className="input-container ">
        <input type="text" className="cityinput" placeholder="Search City" 
          onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
        {/* <div className="search-icon" onClick={()=>search()}> */}
          <img src={searchicon} alt="search" className='imagefixed' onClick={()=>search()}/>
        {/* </div> */}
      </div>
      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotfound && <div className="city-not-found">City not found</div>}
     { !loading && !cityNotfound && <Weatherdatails icons={icon} temp={temp} city={city} country={country}
      lat={lat} log={log} humidity={humidity} wind={wind} /> }
      <p className='copyright'>
        Designed by <span>K K VASANTH</span>
      </p>
    </div>
  );
}

export default App;
