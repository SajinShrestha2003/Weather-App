import { useState } from "react";
import Swal from "sweetalert2"; //npm i sweetalert2
import "./WeatherPage.css";

const api = {
    key: "7490403b9527edc8b3f7a96f45e1fc96", //add your personal key
    base: "https://api.openweathermap.org/data/2.5/",
};

export default function WeatherPage() {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (location === "") {
            Swal.fire({
                title: "No Location Inserted",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else {
            try {
                let res = await fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`);
                if (!res.ok) {
                    console.log(`Problem fetching data`);
                    return;
                }
                let data = await res.json();

                console.log(data);
                setWeatherData(data);
                setLocation("");
            } catch (error) {
                console.log(`${error}`);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="title">Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                    }}
                    placeholder="Enter valid location"
                />
                <button type="submit" className="btn">
                    Get Weather
                </button>
            </form>

            {!weatherData ? (
                <h2>No Data Found</h2>
            ) : (
                <div className="secondContainer">
                    <h3>{weatherData.name}</h3>
                    <div className="location">
                        <p>Latitude: {weatherData.coord.lat}</p>
                        <p>Longitude: {weatherData.coord.lon}</p>
                    </div>
                    <div className="dataContainer">
                        <p>Temperature: {weatherData.main.temp}°C</p>
                        <p>Condition: {weatherData.weather[0].description}</p>
                        <p>Wind Speed: {weatherData.wind.speed} mph</p>
                        <p>Country: {weatherData.sys.country}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
