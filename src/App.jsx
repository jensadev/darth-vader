import { useState, useEffect } from 'react'
import './App.css'
import Spinner from './components/Spinner'

function App() {
  const [lat, setLat] = useState([])
  const [long, setLong] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    // 1. Get location from browser
    // 2. Check if location is the same as last time
    // 3. If location is the same as last time, use data from localstorage
    // 4. IF data is older than 10 minutes, fetch new data
    // 5. If location is not the same as last time, fetch new data
    // 6. Save data to localstorage

    const fetchData = async () => {
      console.log('fetching data', lat, long)
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      console.log('fetching data', lat, long)
      if (lat.length === 0 || long.length === 0) {
        console.log('no data')
        setData([])
        return
      }
      await fetch(`${import.meta.env.VITE_API_URL}lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          console.log(result)
        }).catch(err => {
          console.log(err)
        })
    }
    fetchData()
  }, [lat, long]);

  // datum formattering https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

  return (
    <main>
      <header>
        <h1>DARTH VÄDER</h1>
      </header>
      <article>
        {(typeof data.main !== 'undefined') ? (
          <div>
            <h2>{data.name}</h2>
            <p>Temprature: {data.main.temp}</p>
            <p>Sunrise: {data.sys.sunrise}</p>
            <p>Sunset: {data.sys.sunset}</p>
            <p>Description: {data.weather[0].description}</p>
          </div>
        ) : (
          <Spinner />
        )}
      </article>
    </main>
  )
}

export default App


/*
                          

{
  "coord": {
    "lon": 10.99,
    "lat": 44.34
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 298.48,
    "feels_like": 298.74,
    "temp_min": 297.56,
    "temp_max": 300.05,
    "pressure": 1015,
    "humidity": 64,
    "sea_level": 1015,
    "grnd_level": 933
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.62,
    "deg": 349,
    "gust": 1.18
  },
  "rain": {
    "1h": 3.16
  },
  "clouds": {
    "all": 100
  },
  "dt": 1661870592,
  "sys": {
    "type": 2,
    "id": 2075663,
    "country": "IT",
    "sunrise": 1661834187,
    "sunset": 1661882248
  },
  "timezone": 7200,
  "id": 3163858,
  "name": "Zocca",
  "cod": 200
}                        

                        */