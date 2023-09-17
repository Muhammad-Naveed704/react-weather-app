import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "./home.css";
import clear_bg from "../Assets/sunny.jpg";
import cloud_bg from "../Assets/cloudy.jpg";
import drizzle_bg from "../Assets/Rain.jpg";
import thunder_bg from "../Assets/thunder.jpg";
import snow_bg from "../Assets/snow.jpg";
import haze_bg from "../Assets/haze.jpg";

const Home = () => {
  const cityNameRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const [weatherName, setWeatherName] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=40ed58a2765c4a602efac457943bedcc&units=metric`
      );
      console.log(response.data);
      setWeather(response.data);
      setWeatherName(response.data.weather[0].main);
    } catch (error) {
      console.log(error.data);
    }
  };

  function setBackground() {
    if (
      weatherName == "Haze" ||
      weatherName == "Mist" ||
      weatherName == "Smoke" ||
      weatherName == "Dust" ||
      weatherName == "Fog" ||
      weatherName == "Sand" ||
      weatherName == "Ash" ||
      weatherName == "Squall" ||
      weatherName == "Tornado"
    ) {
      return `url(${haze_bg})`;
    } else if (weatherName == "Rain" || weatherName == "Drizzle") {
      return `url(${drizzle_bg})`;
    } else if (weatherName == "Clouds") {
      return `url(${cloud_bg})`;
    } else if (weatherName == "Thunderstorm") {
      return `url(${thunder_bg})`;
    } else if (weatherName == "Snow") {
      return `url(${snow_bg})`;
    } else if (weatherName == "Clear") {
      return `url(${clear_bg})`;
    }
  }

  return (
    <>
      <div className="weatherMainBox">
        <div
          className="leftContainer"
          style={{
            backgroundImage: setBackground(),
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <form onSubmit={submitHandler}>
            <input
              className="searchInput"
              type="text"
              id="cityNameInput"
              required
              placeholder="Search City Name"
              minLength={2}
              maxLength={20}
              ref={cityNameRef}
            />
            <button className="searchBtn" type="submit">
              Get Weather
            </button>
          </form>
          {weather ? (
            <>
              <div className="cityNameBox">
                {" "}
                <span>{weather.name}</span>{" "}
              </div>
              <div className="contTeamDescBox">
                <div className="counteryNameBox">
                  Countery Name <span> {weather?.sys?.country} </span>
                </div>
                <div className="teamBox">
                  Teampreture<span>{weather?.main?.temp}°C</span>{" "}
                </div>
                <div className="descBox">
                  Weather Description{" "}
                  <span>{weather?.weather[0]?.description}</span>
                </div>
              </div>{" "}
            </>
          ) : (
            <div>
              <h1>No Country Found</h1>
            </div>
          )}
        </div>
        <div
          className="rightContainer"
          style={{
            backgroundImage: setBackground(),
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {weather ? (
            <>
              <div className="weatherDetailsBox">
                <div className="subDetailBox">
                  {" "}
                  <span className="boxTitle">Min/Max</span>{" "}
                  <span className="minMaxTeam">
                    {weather?.main?.temp_min} °C <br />
                    {weather?.main?.temp_max} °C
                  </span>
                </div>
                <div className="subDetailBox">
                  <span className="boxTitle">Visibility </span>{" "}
                  <span>{weather?.visibility / 100} km/h</span>
                </div>
                <div className="subDetailBox">
                  <span className="boxTitle">Humidity</span>{" "}
                  <span>{weather?.main?.humidity} %</span>
                </div>
              </div>
              <div className="weatherDetailsBox2">
                <div className="subDetailBox2">
                  <span className="boxTitle">Pressure</span> <br />{" "}
                  <span>{weather?.main?.pressure} mb</span>
                </div>
                <div className="subDetailBox2">
                  <span className="boxTitle">feels like</span> <br />{" "}
                  <span> {weather?.main?.feels_like}</span>
                </div>
                <div className="subDetailBox2">
                  <div>
                    <span className="boxTitle"> wind speed</span> <br />{" "}
                    <span> {weather?.wind?.speed} km/h</span>{" "}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              {" "}
              <h1>no data found</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
