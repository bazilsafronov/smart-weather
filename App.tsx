import React, { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [fiveDays, setFiveDays] = useState([]);
  const [latLon, setLanLon] = useState({ lat: 0, lon: 0 });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=ru&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      //ci' cs'""
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLanLon(response?.data?.coord);
      });
      setLocation("");
    }
  };

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${(latLon.lat).toFixed(2)}&lon=${(latLon.lon).toFixed(2)}&lang=ru&appid=895284fb2d2c50a520ea537456963d9c`)
      .then((res) => {
        setFiveDays(res.data);
      })
      .catch(console.log);
  }, []);
  const handleClickGetFiveDays = () => {
    console.log(fiveDays);
  }; //viw

  return (
    <div className="app">
      <h1>Smart Weather</h1>
      <div className="search">
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          onKeyDown={searchLocation}
          placeholder="Введите город"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div>
            <button
              onClick={handleClickGetFiveDays}
              type="button"
              className="btn-five"
            >
              {" "}
              Прогноз на 5 дней
            </button>
            <button type="button" className="btn-more-info">
              {" "}
              Подробный прогноз
            </button>
          </div>
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            <img src="./assets/clouds.png" alt="image_weather" width={100} height={100} />
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Ощущается</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Влажность</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} м/c</p>
              ) : null}
              <p>Скорость ветра</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
