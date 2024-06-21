
import './App.css';
import search from "./images/Search.jpg";
import clear from "./images/Clear.jpeg";
import { useEffect, useState } from 'react';
import cloud from "./images/Cloud.jpeg";
import drizzle from "./images/Drizzle.jpeg";
import rain from "./images/Rain.jpeg";
import wind from "./images/Wind.jpeg";
import snow from "./images/Snow.jpeg";
import humidity from "./images/Humidity.jpeg"

const WeatherDetails  = ({icon, temp, city, country,
   lat, log, humidityy, windd }) => {
  return (
    <>
    <div className='image'>
      <img src={icon}  className='clearIcon'/>
    </div>
    <div className = 'temp'> {temp}
    °C
    </div>
    <div className='location'>
      {city}
    </div>
    <div className="country">
      {country}
    </div>
    <div className="cord">
      <div>
        <span className='lat'>Latitude</span>
        <span>{lat} </span>
      </div>
      <div>
        <span className='log'>Longitude</span>
        <span>{log} </span>
      </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidity} className='humidityIcon'/>
        <div className="data">
          <div className="humidity-percent"> {humidityy} %</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={wind} className='windIcon'/>
        <div className="data">
          <div className="wind-percent"> {windd} km/hr</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>

    </>
  )
}

function App() {
let api_key = "4a1ff5cf4bf60d617521254d7ba2d329";
const [text, setText] = useState('Chennai')

  const [icon, setIcon] = useState(clear)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState(0)
  const [log, setLog] = useState(0)
  const [humidityy, setHumidityy] = useState(0)
  const [windd, setWindd] = useState(0)

  const [cityNotFound, setCityNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const weatherIconMap = {
    "01d": clear,
    "01n": cloud,
    "02d": clear,
    "02n": rain,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    };







 
 
const searching = async () =>{
setLoading(true);

let url = `https://api.openweathermap.org/data/2.5/weather?q=
${text}&appid=${api_key}&units-Metric`;

try {
  let res = await fetch(url);
  let data = await res.json();
  //console.log(data);
  if(data.cod === "404") {
  console.error("City not found");
  setCityNotFound(true);
  setLoading (false);
  return;
  }
setHumidityy (data.main.humidity);
setWindd(data.wind.speed);
setTemp(Math.floor(data.main.temp));
setCity (data.name);
setCountry (data.sys.country);
setLat (data.coord.lat);
setLog(data.coord.lon);
const weatherIconCode = data.weather[0].icon
setIcon(weatherIconMap[weatherIconCode]  || clear)
setCityNotFound(false)

}
catch (error) {
console.error("An error occurred:", error.message);
setError("An error occured while fetching weather data")
}
finally {
setLoading (false);
}
}

const handleCity = (e)=> {
  setText(e.target.value)
}
const handleKeyDown = (e)=> {
   if (e.key === "Enter")
   {
    searching()
   }
}

 useEffect(function()
 {
  searching()
 },[])


  return (
    <>
    <div className='container'>
      <div className='input-container'>
        <input type='text' className='cityInput' placeholder='Search City' onChange={handleCity} value={text} 
        onKeyDown={handleKeyDown} />
        <div className='search-icon' onClick={()=>searching()} >
        <img src= {search}  alt='search' className='searchIcon' />
        </div>
      </div>

      {loading && <div className='loading-message'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {cityNotFound &&  <div className='city-not-found'>City not found</div>}


    {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country}
      lat={lat} log={log} humidityy={humidityy} windd={windd} text={text}
      />}

      <div className="copyright">
        Designed by<span>Adhish</span>
      </div>
    </div>
    </>
  )
}
export default App;

