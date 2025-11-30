//Типове и интерфейси
export interface CurrentWeather {
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
  city: CityInfo;
}
export interface CityInfo{
    id: 'ruse' | 'sofia' | 'varna' | 'plovdiv' | 'burgas';
    name: string;
    lat: number;
    lon: number;
}
export interface WeatherDisplayProps {
  data: WeatherData;
}
export interface HomeProps{
    onCitySelect: (city: CityInfo) => void;
}