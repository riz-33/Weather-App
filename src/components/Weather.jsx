import React, { useRef, useEffect, useState } from 'react'
import './Weather.css'
import search from '../assets/search.png'
import blackCloud from '../assets/blackCloud.png'
import cloud from '../assets/cloud.png'
import cloudyMoon from '../assets/cloudyMoon.png'
import cloudySun from '../assets/cloudySun.png'
import humidity from '../assets/humidity.png'
import mist from '../assets/mist.png'
import moon from '../assets/moon.png'
import pressure from '../assets/pressure.png'
import rainyCloud from '../assets/rainyCloud.png'
import rainyMoon from '../assets/rainyMoon.png'
import rainySun from '../assets/rainySun.png'
import snow from '../assets/snow.png'
import sun from '../assets/sun.png'
import thunder from '../assets/thunder.png'
import Swal from 'sweetalert2'

const Weather = () => {
    const inputRef = useRef()
    const [weather, setWeather] = useState(false);
    const allIcons = {
        '01d': sun,
        '02d': cloudySun,
        '03d': cloud,
        '04d': blackCloud,
        '09d': rainyCloud,
        '10d': rainySun,
        '11d': thunder,
        '13d': snow,
        '50d': mist,
        '01n': moon,
        '02n': cloudyMoon,
        '03n': cloud,
        '04n': blackCloud,
        '09n': rainyCloud,
        '10n': rainyMoon,
        '11n': thunder,
        '13n': snow,
        '50n': mist
    }

    const Search = async (city) => {
        if (city === '') {
            return Swal.fire("Please Enter City Name");
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}
            &appid=a9bf79fd292504d6f0829a2dd6d6ccc6&units=metric`
            const res = await fetch(url)
            const data = await res.json()
            if (data.cod === '404') {
                return Swal.fire("City Not Found");
            }
            // console.log(data)
            const icons = allIcons[data.weather[0].icon] || sun;
            setWeather({
                city: data.name,
                temp: Math.floor(data.main.temp),
                temp_max: Math.floor(data.main.temp_max),
                temp_min: Math.floor(data.main.temp_min),
                humidity: data.main.humidity,
                wind: data.wind.speed,
                main: data.weather[0].main,
                description: data.weather[0].description,
                icon: icons,
                feels: data.main.feels_like,
                speed: data.wind.speed,
            })
        } catch (error) {
            setWeather(false);
            // console.log(error)
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
                <img className='weather-icon' src={weather.icon} alt="" />
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

export default Weather;