function WeatherPanel(props) {

    if (props.error) {
        return (
                <div id = "weather-app-panel">
                    <p>Data feching error!</p>
                </div>
                )
    }

    if (props.loading) {
        return (
                <div id = "weather-app-panel">
                    <p>Loading...</p>
                </div>
                )
    }

    if (!props.weatherData.hasOwnProperty('date')) {
        return (
                <div id = "weather-app-panel">
                    <p>There are not data!</p>
                </div>
                );
    }

    return (
            <div id = "weather-panel">  
                <div id="weather-panel-dt">
                    {props.weatherData.date} {props.weatherData.time}
                </div>
                <div id="weather-panel-location">
                    {props.weatherData.city} {props.weatherData.country}
                </div>
                <div id="weather-panel-weather">
                    <img id="weather-panel-icon" 
                         src={props.weatherData.icon} 
                         alt="weather icon"/> 
                    <span id="weather-panel-temp">{props.weatherData.temp}</span>
                </div>
                <div id="weather-app-panel-extra">
                    <p>Humidity: {props.weatherData.humidity}</p>
                    <p>Wind: {props.weatherData.wind}</p>
                </div>
            </div>
            );
}


