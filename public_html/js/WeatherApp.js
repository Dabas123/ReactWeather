function WeatherApp(props) {
    const [weatherData, setWeatherData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();

    const cities = {
        0: {
            name: "Szentgotthárd",
            lat: 46.9526,
            lon: 16.2736
        },
        1: {
            name: "Budapest",
            lat: 47.498,
            lon: 19.0399
        },
        2: {
            name: "Győr",
            lat: 47.6833,
            lon: 17.6351
        },
        3: {
            name: "Debrecen",
            lat: 47.5333,
            lon: 21.6333
        },
        4: {
            name: "Pécs",
            lat: 46.0833,
            lon: 18.2333
        },
        5: {
            name: "New York",
            lat: 40.7143,
            lon: -74.006
        }         
    }

    const getCities = () => {
        let retval = [];
        Object.entries(cities).forEach(([key, value]) => {
            retval.push(<option value={key}>{cities[key].name}</option>);
        });
        return retval;
    }

    const handleSelectChange = (event) => {
        getForecastData(event.target.selectedIndex);
    }

    const weatherDataFilter = (data) => {
        let filteredData = {};
        if (data.cod === 200) {
            let date = new Date((data.dt + data.timezone) * 1000);
            filteredData.date = date.toISOString().substr(0, 10);
            filteredData.time = date.toISOString().substr(11, 5);
            filteredData.city = data.name;
            filteredData.country = data.sys.country;
            filteredData.temp = Math.round(data.main.temp) + ' °C';
            filteredData.humidity = data.main.humidity + ' %';
            filteredData.wind = data.wind.speed + ' m/s';
            filteredData.icon = "http://openweathermap.org/img/wn/"
                    + data.weather[0].icon
                    + "@2x.png";
            setWeatherData(filteredData);
        } else {
            setError(true);
        }
    }

    const getForecastData = (index) => {
        setLoading(true);
        fetch('https://api.openweathermap.org/data/2.5/weather?'
                + 'lat=' + cities[index].lat + '&lon=' + cities[index].lon
                + '&units=metric'
                + '&appid=9756bac11921061ff1f59a3898479241')
                .then((res) => {
                    return res.json();
                }
                )
                .then(
                        (result) => {
                    setLoading(false);
                    weatherDataFilter(result);
                },
                        (error) => {
                    setError(error);
                }
                )
    };

    React.useEffect(() => {
        getForecastData(0);
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
                    <select id="cities" 
                            onChange = {(event) => handleSelectChange(event)}>
                        {getCities()}
                    </select>
                </div>
                <div>
                    <label id="footer">Powered by <a 
                            href="https://openweathermap.org/" target="_blank">
                            OpenWeather</a>
                    </label>                
                </div>
            </div>
            );
}



