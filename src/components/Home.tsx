import React from 'react';
import type { HomeProps, CityInfo } from 'src/types/types';

const CITIES: CityInfo[] = [
    { id: 'ruse', name: 'Русе', lat: 43.8569, lon: 25.9678},
    { id: 'sofia', name: 'София', lat: 42.6975, lon: 23.2141},
    { id: 'varna', name: 'Варна', lat: 43.2167, lon: 27.9167},
    { id: 'plovdiv', name: 'Пловдив', lat: 42.14, lon: 24.74},
    { id: 'burgas', name: 'Бургас', lat: 42.30, lon: 27.28}
];

const Home: React.FC<HomeProps> = ({onCitySelect}) => (
    <div className='p-8 h-full min-h-[550px] flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold text-indigo-400 mb-6'>
            Изберете Град
        </h2>
        <p className='text-xl text-white mb-6'>
            Избери град, за да ти се покаже прогнозата за него.
        </p>
        <div className='space-y-4 w-full max-w-xs'>
            {CITIES.map(city => (
                <button
                    key={city.id}
                    onClick={() => onCitySelect(city)}
                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-transform duration-200 transform hover:scale-105 shadow-md'
                >
                    {city.name}
                </button>
            ))}
        </div>
    </div>
);

export default Home;