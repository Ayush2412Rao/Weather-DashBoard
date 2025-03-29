const ForecastCard = ({ day }) =>{
    return (
        <div className="bg-gray-800 text-white p-4 rounded-md text-center">
            <p>{new Date(day.dt_txt).toLocaleDateString("en-US",{ weekday: "short"})}</p>
            <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                alt="weather icon" 
            />
            <p>{Math.round(day.main.temp)}°C</p>
        </div>
    );
  };
export default ForecastCard;