import { useState } from "react"
import axios from "axios"

function Weather() {
    const [temp, setTemp] = useState("")
    const [desc, setDesc] = useState("")
    const [city, setCity] = useState("")
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")

    const handleInput = (evt) => setCity(evt.target.value);

    const getWeather = () => {
        var weatherData = axios(`http://api.weatherapi.com/v1/current.json?key=9dcc41f3610a45088c0140230252503&q=${city}`);
        weatherData.then((success) => {
            console.log(success.data);
            setDesc(success.data.current.condition.text)
            setTemp(success.data.current.temp_c)
            setTime(success.data.current.last_updated.split(' ')[1])
            setLocation(success.data.location.name)
            setCity("")
        }).catch(error => console.error(error));
    }



    return (
        <div className='bg-[#43AEFC] p-6 min-h-screen flex justify-center items-center'>
            <div className='bg-white border border-transparent rounded w-full max-w-md'>
                <h1 className="text-[#43AEFC] text-xl sm:text-2xl font-semibold px-5 py-3 border border-transparent border-b-gray-400">Weather App</h1>
                <div className="px-2 sm:px-5 py-3 flex justify-center">
                    <input value={city} onChange={handleInput} className="border p-2 w-full rounded-l border-gray-400 mt-3" type="text" placeholder="Enter city name" />
                    <button onClick={getWeather} className="border p-1 rounded-r bg-[#43AEFC] text-white border-gray-400 mt-3  cursor-pointer">Fetch</button>
                </div>
                <div className="px-5 py-2">

                    <p className="text-5xl font-bold text-center text-gray-500 mb-2">{temp ? `${temp}°C` : ""}</p>
                    <p className="text-2xl text-center text-gray-700 mb-3">{desc}</p>


                    <div className="flex justify-between mt-5">
                        <p className="text-end text-gray-700 mb-3">{time ? `updated at : ${time}` : ""}</p>
                        <p className="text-end text-gray-700 mb-3">{location ? `📍${location}` : ""}</p>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Weather

//°C