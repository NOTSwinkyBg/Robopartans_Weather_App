import React, {useState, useEffect} from 'react';
import WeatherDisplay from './../components/WeatherDisplay';
import Home from './../components/Home';
import type { WeatherData, CityInfo } from './../types/types';

const Weather: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<CityInfo | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCitySelect = (city: CityInfo) => {
    setCurrentCity(city);
    setData(null);
    setError(null);
  }
  
  useEffect(() => {
    if(!currentCity){
      setIsLoading(false);
      return;
    }

    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${currentCity.lat}&longitude=${currentCity.lon}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`;
    
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Мрежова грешка: ${response.status}`);
        }
        
        const result = await response.json() as WeatherData;
        
        if (!result.current) {
            throw new Error("Невалиден отговор от API.");
        }

        setData(result);
        
      } catch (err) {
        setError(`Неуспешно зареждане на прогноза: ${(err as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [currentCity]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6">
          <svg className="animate-spin h-12 w-12 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-400 text-xl font-medium">Свързване със сателита...</p>
        </div>
      );
    }

    // Error
    if (error) {
      return (
        <div className="bg-red-900 p-8 rounded-xl text-red-300 border border-red-700 h-full min-h-[300px] flex flex-col items-center justify-center space-y-4">
          <p className="font-bold text-center text-2xl">⚠️ Грешка при прогнозата</p>
          <p className="text-sm italic">{error}</p>
        </div>
      );
    }

    // No Data
    return <p className="text-gray-500 h-60 flex items-center justify-center">Няма налична прогноза за времето.</p>;
  };

  const renderRouterContent = () => {
    if(!currentCity) return <Home onCitySelect={handleCitySelect}/>;
    if(isLoading || error || !data) return renderContent();
    return <WeatherDisplay data={data}/>
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center flex justify-center items-center">
          {currentCity && (
            <button
              onClick={() => setCurrentCity(null)}
              className='absolute left-6 top-6 md:static mr-4 text-gray-400 hover:text-indigo-400 transition text-lg'
              >
                &larr; Назад
              </button>
          )}
          <div>
            <h1 className="text-5xl font-bold text-white drop-shadow">
              <span className="text-indigo-400">Weather</span>
              <span className="text-white">App</span>
            </h1>
            <h2 className="mt-2 text-lg text-gray-300">
              {currentCity ? `Прогноза за ${currentCity.name}` : 'Изберете град'}
            </h2>
          </div>
        </header>

        <div className="rounded-3xl overflow-hidden min-h-[550px] ">
          {renderRouterContent()}
        </div>

      </div>
    </div>
  );
}

export default Weather;