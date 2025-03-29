const getWeatherBackground = (weather) =>{
    if(!weather || !weather.weather || !weather.weather[0]) return "bg-gray-300";
    const condition = weather.weather[0].main.toLowerCase();

    const backgrounds = {
        clear:"bg-blue-500",
        clouds:"bg-gray-400",
        rain:"bg-gray-600",
        snow:"bg-gray-200",
        thunderstorm:"bg-gray-800",
        drizzle:"bg-gray-500",
        mist:"bg-gray-300",
    };
    return backgrounds[condition] || "bg-gray-300";
};

const WeatherCard = ({weather}) =>{
    if(!weather) return null;
    return (
        <div className={`shadow-lg rounded p-6 text-center text-white ${getWeatherBackground(weather)}`}>
            <h2 className="text-xl font-bold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-4xl">{Math.round(weather.main.temp)}°C</p>
            <p className="capitalize">{weather.weather[0].description}</p>
            <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt="Weather icon" 
                className="mx-auto"
            />
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} km/h</p>
        </div>
    );
};
export default WeatherCard;
  

  