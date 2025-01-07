import React, { useRef, useEffect, useState } from 'react'
import './Weather.css'
import search from '../assets/search.png'
import cloudy from '../assets/cloudy.png'
import foggy from '../assets/foggy.png'
import humidity from '../assets/humidity.png'
import pressure from '../assets/pressure.png'
import rain from '../assets/rain.png'
import sunny from '../assets/sunny.png'
import snow from '../assets/snow.png'
import thunder from '../assets/thunder.png'

const Weather = () => {
    const inputRef = useRef()
    const [weather, setWeather] = useState(false);

    const Search = async (city) => {
        if (city === '') {
            return alert('Please Enter City Name')
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}
            &appid=a9bf79fd292504d6f0829a2dd6d6ccc6&units=metric`
            const res = await fetch(url)
            const data = await res.json()
            if (data.cod === '404') {
                return alert('City Not Found')
            }
            console.log(data)
            setWeather({
                city: data.name,
                // country: data.sys.country,
                temp: Math.floor(data.main.temp),
                temp_max: Math.floor(data.main.temp_max),
                temp_min: Math.floor(data.main.temp_min),
                humidity: data.main.humidity,
                // pressure: data.main.pressure,
                wind: data.wind.speed,
                main: data.weather[0].main,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                feels: data.main.feels_like,
                speed: data.wind.speed,
            })
        } catch (error) {
            setWeather(false);
            console.log(error)
        }
    }
    useEffect(() => {
        Search('Karachi')
    }, [])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img width={20} src={search} alt="" onClick={() =>
                    Search(inputRef.current.value)
                } />
            </div>
            {weather ? <>
                <img className='weather-icon' src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
                <p className='temperature'>{weather.temp}°C</p>
                <p className='description'>{weather.description}</p>
                <p className='location'>{weather.city}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity} alt="" />
                        <div>
                            <p>{weather.humidity}%</p>
                            <span>humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={pressure} alt="" />
                        <div>
                            <p>{weather.speed} KM/H</p>
                            <span>Wind</span>
                        </div>
                    </div>
                </div>
            </> :
                <></>}

        </div>
    )
}


export default Weather