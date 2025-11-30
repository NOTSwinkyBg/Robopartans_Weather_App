import React, {useState, useEffect} from 'react';

//Константи
const CITY_NAME = 'Русе, България';
const RUSE_LAT = 43.8569;
const RUSE_LON = 25.9678;
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${RUSE_LAT}&longitude=${RUSE_LON}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`;

//Типове и интерфейси
interface CurrentWeather {
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  time: string;
}
export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
}
interface WeatherDisplayProps {
  data: WeatherData;
}

//Помощни функции
const getWeatherDescription = (code: number) => {
  if (code === 0) return { text: 'Ясно небе', icon: '☀️' };
  if (code >= 1 && code <= 3) return { text: 'Предимно облачно', icon: '🌤️' };
  if (code >= 45 && code <= 48) return { text: 'Мъгла', icon: '🌫️' };
  if (code >= 51 && code <= 55) return { text: 'Лек дъжд', icon: '☔' };
  if (code >= 61 && code <= 65) return { text: 'Дъжд', icon: '🌧️' };
  if (code >= 71 && code <= 75) return { text: 'Сняг', icon: '🌨️' };
  if (code >= 95) return { text: 'Гръмотевична Буря', icon: '⛈️' };
  return { text: 'Смесени условия', icon: '❓' };
};

const getWindDirection = (deg: number) => {
  if (deg >= 337.5 || deg < 22.5) return 'С';
  if (deg >= 22.5 && deg < 67.5) return 'СИ';
  if (deg >= 67.5 && deg < 112.5) return 'И';
  if (deg >= 112.5 && deg < 157.5) return 'ЮИ';
  if (deg >= 157.5 && deg < 202.5) return 'Ю';
  if (deg >= 202.5 && deg < 247.5) return 'ЮЗ';
  if (deg >= 247.5 && deg < 292.5) return 'З';
  return 'СЗ';
};

//Компонент дете
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

export default function WeatherApp() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  const renderContent = () => {
    
    // Loading
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

    // Data
    if (data && data.current) {
      return <WeatherDisplay data={data} />;
    }
    
    // No Data
    return <p className="text-gray-500 h-60 flex items-center justify-center">Няма налична прогноза за времето.</p>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 p-6">
      <div className="w-full max-w-4xl">

        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white drop-shadow">
            <span className="text-indigo-400">Weather</span>
            <span className="text-white">App</span>
          </h1>
          <h2 className="mt-2 text-lg text-gray-300">
            Начална Прогноза за {CITY_NAME}
          </h2>
        </header>

        <div className="rounded-2xl">
          {renderContent()}
        </div>

      </div>
    </div>
  );
}
