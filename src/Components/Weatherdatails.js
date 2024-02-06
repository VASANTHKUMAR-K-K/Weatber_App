import React from 'react'
 import humidityIcon from '../Weather icons/humidity.png';
 import windIcon from '../Weather icons/wind.png';

export default function Weatherdatails({icons,temp,city,country,lat,log,humidity,wind}) {
  return (
    <>
    <div className="image">
      <img src={icons} alt="images"/>
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
        <div>
            <span className='lat'>latitude</span>
            <span>{lat}</span>
        </div>
        <div>
            <span className='log'>longitude</span>
            <span>{log}</span>
        </div>
    </div>
    <div className="data-container">
        <div className='element'>
            <img src={humidityIcon} alt="humidity" className='icon'/>
            <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Percentage</div>
            </div>
        </div>
        <div className='element'>
            <img src={windIcon} alt="wind" className='icon'/>
            <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
            </div>
        </div>
    </div>
    </>
  )
}
