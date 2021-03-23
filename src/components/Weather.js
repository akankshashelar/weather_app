import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "094aa776d64c50d5b9e9043edd4ffd00";

  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      let localData = localStorage.getItem("data");
      // console.log("localData", localStorage.getItem("data"));
      setWeather({ data: localData });
    } else {
        if(form.city.length>3 ){
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);
      setWeather({ data: data });
      window.localStorage.setItem("data", JSON.stringify(data));
      window.localStorage.setItem("DateTime", JSON.stringify(new Date()));
    }
    else alert("Enter More than 3 characher")
    }
  }
  var min = 10; // Reset when storage is more than 10min
  var now = new Date().getTime();
  var setupTime = localStorage.getItem("data");
  if (setupTime === null) {
    localStorage.setItem("DateTime", now);
  } else {
    if (now - setupTime > min * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("data", "");
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
  };
  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
