import React from 'react';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcomePage__content">
      <h1 className="welcomePage__title">Weather Forecaster</h1>
      <p className="welcomePage__text">
        Enter below a place you want to know the weather of and choose one from
        the dropdown
      </p>
      <div>
        <input className="welcomePage__input" type="text" />
        <button className="welcomePage__button" type="button">
          Search
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
