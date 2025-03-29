import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForecastCard from "./components/ForecastCard";

const API_KEY="6be8529abb935a37bec8d8723dbdd3b4";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL="https://api.openweathermap.org/data/2.5/forecast";

function App(){
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");

    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);
  const fetchWeather = async (city) =>{
    setLoading(true);
    setError(null);

    try{
      const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const forecastResponse = await axios.get(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);

      setWeather(response.data);
      setForecast(forecastResponse.data.list.filter((_, index)=> index%8===0));

      updateSearchHistory(city);
    } catch(err){
      setError("City not found or API error...");
    } finally{
      setLoading(false);
    }
  }


  const updateSearchHistory = (city) =>{
    let updatedHistory = [city, ...searchHistory.filter((c)=> c!==city)];
    if(updatedHistory.length>5) updatedHistory.pop();
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const toggleTheme = ()=>{
    setDarkMode((prev)=>!prev);
    localStorage.setItem("theme",darkMode?"light":"dark");
  };

  return (
    <div className={`${darkMode?"bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-6 transition-all`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <button onClick={toggleTheme} className="bg-blue-500 px-4 py-2 rounded-md text-white">
            {darkMode?"Light Mode":"Dark Mode"}
          </button>
        </div>
        <SearchBar onSearch={fetchWeather} />

        <div className="mt-4 flex gap-2 flex-wrap">
          {searchHistory.map((city,index)=>(
            <button key={index} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400" onClick={()=> fetchWeather(city)}>
              {city}
            </button>
          ))}
        </div>
        {loading && <LoadingSpinner/>}
        {error && <ErrorMessage message={error}/>}
        {weather && <WeatherCard weather={weather}/>}
        {forecast.length>0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {forecast.map((day, index)=>(
              <ForecastCard key={index} day={day} />
            ))}
          </div>  
        )}

        {weather && (
          <button onClick={()=> fetchWeather(weather.name)} className="mt-4 bg-green-500 px-4 py-2 text-white rounded-md">
            Refresh Weather
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
