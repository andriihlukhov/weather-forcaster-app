import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { OptionType } from './types';
import WelcomePage from './pages/WelcomePage/WelcomePage';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<OptionType | null>(null);
  const [forecast, setForecast] = useState<null>(null);

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

  useEffect(() => {
    if (city) {
      setInputValue(city.name);
      setOptions([]);
    }
  }, [city]);

  const getForecast = (city: OptionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setForecast(data));
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };
  return (
    <div className="appContainer">
      {forecast ? (
        'we have forecast'
      ) : (
        <div className="searchBar">
          <WelcomePage
            inputValue={inputValue}
            onInputChange={onInputChange}
            options={options}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default App;
