function WeatherPanel(props) {

    if (props.error) {
        return (
                <div id = "weather-app-panel">
                    <p>Data feching error!</p>
                </div>
                )
    }

    if (props.loading) {
        //http://openweathermap.org/img/wn/10d@2x.png

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
            <div id = "weather-app-panel">  
                <p>{props.weatherData.date}</p>
                <p>{props.weatherData.time}</p>
                <p>{props.weatherData.country}</p>
                <p>{props.weatherData.city}</p>
                <p>{props.weatherData.temp}</p>
                <p>{props.weatherData.humidity}</p>
                <p>{props.weatherData.wind}</p>
            </div>
            );
}


