export const getWeatherDescription = (code: number) => {
  if (code === 0) return { text: 'Ясно небе', icon: '☀️' };
  if (code >= 1 && code <= 3) return { text: 'Предимно облачно', icon: '🌤️' };
  if (code >= 45 && code <= 48) return { text: 'Мъгла', icon: '🌫️' };
  if (code >= 51 && code <= 55) return { text: 'Лек дъжд', icon: '☔' };
  if (code >= 61 && code <= 65) return { text: 'Дъжд', icon: '🌧️' };
  if (code >= 71 && code <= 75) return { text: 'Сняг', icon: '🌨️' };
  if (code >= 95) return { text: 'Гръмотевична Буря', icon: '⛈️' };
  return { text: 'Смесени условия', icon: '❓' };
};

export const getWindDirection = (deg: number) => {
  if (deg >= 337.5 || deg < 22.5) return 'С';
  if (deg >= 22.5 && deg < 67.5) return 'СИ';
  if (deg >= 67.5 && deg < 112.5) return 'И';
  if (deg >= 112.5 && deg < 157.5) return 'ЮИ';
  if (deg >= 157.5 && deg < 202.5) return 'Ю';
  if (deg >= 202.5 && deg < 247.5) return 'ЮЗ';
  if (deg >= 247.5 && deg < 292.5) return 'З';
  return 'СЗ';
};