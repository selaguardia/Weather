import { useState} from 'react'

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        });
    }
  }

  const dateBuilder = currentDate => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

    let day = days[currentDate.getDay()];
    let date = currentDate.getDate();
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();

    return `${day}, ${month} ${date}, ${year}`
  }
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp >60) ? 'app sunny' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter Zip Code or City Name"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}

          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)} ºF
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
            <div className="container boxContainer">
              <div className="box">
                <p>Min: {Math.round(weather.main.temp_min)} ºF</p>
                <p>Max: {Math.round(weather.main.temp_max)} ºF</p>
              </div>
              <div className="box">
                <p>Feels Like: {Math.round(weather.main.feels_like)} ºF</p>
              </div>
              <div className="box">
                <p>Humidity: {Math.round(weather.main.humidity)}%</p>
              </div>
              <div className='box'>
                <p>Sunrise:{weather.sys.sunrise}</p>
                <p>Sunset: </p>
              </div>
            </div>
          </div>
        ) : (
        <div className="welcomeScreen">
          <h1>Please enter a Zip Code or City above to get current weather temperatures.</h1>
        </div>) }
      </main>
    </div>
  );
}

export default App;
