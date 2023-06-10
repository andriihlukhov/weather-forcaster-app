import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { OptionType } from './types';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import useForecast from './hooks/useForecast';
import ForecastPage from './pages/ForecastPage/ForecastPage';

function App(): JSX.Element {
  const {
    inputValue,
    options,
    forecast,
    onInputChange,
    onSubmit,
    onOptionSelect,
  } = useForecast();
  return (
    <div className="appContainer">
      {forecast ? (
        <ForecastPage forecast={forecast} />
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
