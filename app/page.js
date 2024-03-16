  "use client";
  import Search from '@/components/search/search';
  import './globals.css';
  import CurentWeather from '@/components/curent-weather/curent-weather';
  import { FrameworkProvider } from '@/components/local-storage/local-storage';
  import { SideBar } from '@/components/side-bar/side-bar';
  import { ApiUrldata, ApiKeyData } from './api.js';
  import { useState } from 'react';
  import HeartButton from '@/components/curent-weather/heart-button';
  import LoadingSpinner from '@/components/spinner/LoadingSpinner';
  function Home() {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setforecast] = useState(null)
    const [showCurrentWeather, setShowCurrentWeather] = useState(true); // Add this line
    const [selectedCity, setSelectedCity] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleOnSearchChange = (searchData) => {
      setIsLoading(true);
      console.log(searchData)
      const [lat, lon] = searchData.value.split(" ");
      const CurentWeatherFetch = fetch(`${ApiUrldata}weather?lat=${lat}&lon=${lon}&appid=${ApiKeyData}`)
      const forecastFetch = fetch(`${ApiUrldata}forecast?lat=${lat}&lon=${lon}&appid=${ApiKeyData}`)
      const spin =fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=3000ms')

    
      Promise.all([CurentWeatherFetch, forecastFetch, spin])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();
          setCurrentWeather({ city: searchData.label, ...weatherResponse });
          setforecast({ city: searchData.label, ...forecastResponse });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false); // Set loading to false when the data fetch is complete
        });
    
    }
    return (
      <div className="container">     
        <Search onSearchChange={handleOnSearchChange} />
        <FrameworkProvider className>
          {currentWeather && showCurrentWeather && <CurentWeather data1={currentWeather} data2={forecast}/>}
          {isLoading && <LoadingSpinner />}
          <div className='favorite'>
          <SideBar id='sidebar'  onSidebarSelect={handleOnSearchChange} />
          {currentWeather && <HeartButton id='heartbutton' data1={currentWeather.city.substring(6)} data2={`${currentWeather.coord.lat} ${currentWeather.coord.lon}`} />}
          </div>
          {currentWeather && !showCurrentWeather && <CurentWeather data1={currentWeather} data2={forecast}/>}
        </FrameworkProvider>
      </div>
    );
    
  }

  export default Home;