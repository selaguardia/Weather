import { useState} from 'react'

const api = {
  key: "5538db3149312bb4081b0b4f9e9a9d05",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => setWeather(result));
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
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter Zip Code"
          />
        </div>

        <div className="location-box">
          <div className="location">New York City, US</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        
        <div className="weather-box">
          <div className="temp">
            15º F
          </div>
          <div className="weather">
            Sunny
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
