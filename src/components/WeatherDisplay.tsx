import React from 'react';
import type { WeatherDisplayProps } from '../types/types';
import { getWeatherDescription, getWindDirection } from '../utils/utils';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({data}) => {
  const current = data.current;
  const { text, icon } = getWeatherDescription(current.weather_code);
  const windDiretion = getWindDirection(current.wind_direction_10m);

  const now = new Date(current.time);
  const formattedTime = now.toLocaleDateString('bg-BG', { hour: '2-digit', minute: '2-digit'});
  const formattedDate = now.toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long'});

  const feelsLike = Math.round(current.temperature_2m - 2.5);
  const highTemp = Math.round(current.temperature_2m + 4);
  const lowTemp = Math.round(current.temperature_2m - 3);
  
  const isNight = now.getHours() < 6 || now.getHours() > 19;
  const bgGradient = isNight 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
    : 'bg-gradient-to-br from-indigo-700 to-blue-500';
  
  return(
    <div className={`w-full h-full p-8 rounded-2xl ${bgGradient} text-white shadow-2xl`}>
      <div className='mb-4'>
        <h3 className='text-2xl font-semibold'>СЕГА</h3>
        <p className='text-sm opacity-80'>{formattedDate} • {formattedTime}</p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 items-center'>
        
        {/*current temp */}
        <div className='flex flex-col items-center'>
          <span className='text-6xl md:text-8xl transition-all duration-500'>{icon}</span>
          <p className='text-5xl font-bold mt-2'>
            {Math.round(current.temperature_2m)}
            <sup className='text-3xl md:text-4xl font-light'>°C</sup>
          </p>
        </div> 

        {/* Feel */}
        <div className='space-y-1'>
          <h2 className='text-xl font-semibold'>{text}</h2>
          <p className='text-sm opacity-90'>Усеща се като: <span className='font-semibold'>{feelsLike}°C</span></p>
          <p className='text-sm opacity-90'>Вятър: {windDiretion} {current.wind_speed_10m} km/h</p>
        </div>

        {/* Max/Min */}
        <div className='space-y-2'>
          <div className='flex justify-between bg-white/10 rounded-lg p-2'>
            <span className='opacity-80'>Макс. за деня</span>
            <span className='font-semibold'>{highTemp}°C</span>
          </div>
          <div className='flex justify-between bg-white/10 rounded-lg p-2'>
            <span className='opacity-80'>Мин. за деня</span>
            <span className='font-semibold'>{lowTemp}°C</span>
          </div>
        </div>

      </div>

      <div className='mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-white/20'>
        <div className='bg-white/10 p-3 rounded-lg'>
          <p className='text-sm opacity-70'>Часова зона</p>
          <p className='text-lg font-medium'>{data.timezone.split('/')[1] || data.timezone}</p>
        </div>

        <div className='bg-white/10 p-3 rounded-lg'>
          <p className='text-sm opacity-70'>Код за времето</p>
          <p className='text-lg font-medium'>{current.weather_code}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;