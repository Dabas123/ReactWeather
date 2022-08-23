function WeatherApp(props) {
    const [weatherData, setWeatherData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();

    const weatherdataFilter = (data) => {
        let filteredData = {};
        if (data.cod === 200) {
            let date = new Date(data.dt * 1000);
            filteredData.city = data.name;
            filteredData.date = date.getFullYear()
                    + '-'
                    + (date.getMonth() + 1)
                    + '-'
                    + date.getDate();
            filteredData.time = date.getHours() + ':' + date.getMinutes();
            filteredData.country = data.sys.country;
            filteredData.temp = data.main.temp + '°C';
            filteredData.humidity = data.main.humidity + '%';
            filteredData.wind = data.wind.speed + 'm/s';
            console.log(filteredData);
            setWeatherData(filteredData);
        } else {
            setError(true);
        }
    }

    const getForecastData = () => {
        setLoading(true);
        fetch('https://api.openweathermap.org/data/2.5/weather?'
                + 'lat=46.9526&lon=16.2736'
                + '&units=metric'
                + '&appid=9756bac11921061ff1f59a3898479241')
                .then((res) => {
                    return res.json();
                }
                )
                .then(
                        (result) => {
                    setLoading(false);
                    weatherdataFilter(result);
                },
                        (error) => {
                    setError(error);
                }
                )
    };

    React.useEffect(() => {
        getForecastData();
    }, []);


    return (
            <div className="weather-app-main">
                <label id="caption">Weather app</label>
                <div>
                    <WeatherPanel loading={loading} 
                                  error={error} 
                                  weatherData={weatherData}/>
                </div>                
                <div>
                    <label id="footer">Powered by <a href="https://openweathermap.org/" target="_blank">OpenWeather</a></label>                
                </div>
            </div>
            );
}



