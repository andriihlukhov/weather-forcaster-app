import { ChangeEvent, useEffect, useState } from 'react';
import { Forecast, OptionType } from '../types';

const useForecast = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<OptionType | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (value === '') {
      return;
    }
    getSearchOptions(value);
  };

  const onOptionSelect = (option: OptionType) => {
    setCity(option);
  };

  const getForecast = (city: OptionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      });
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  useEffect(() => {
    if (city) {
      setInputValue(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    inputValue,
    options,
    forecast,
    onInputChange,
    onSubmit,
    onOptionSelect,
  };
};

export default useForecast;
