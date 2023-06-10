import React from 'react';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { GiWindSlap } from 'react-icons/gi';
import { CiTempHigh } from 'react-icons/ci';
import { WiHumidity } from 'react-icons/wi';
import { BsFillCloudRainFill } from 'react-icons/bs';
import { MdVisibility } from 'react-icons/md';
import { IoIosTimer } from 'react-icons/io';
import { Forecast } from '../../types';
import './ForecastPage.css';
import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibility,
  getWindDiretion,
} from '../../functions/functions';
import Tile from '../../components/Tile';

type Props = {
  forecast: Forecast;
};

function ForecastPage({ forecast }: Props): JSX.Element {
  const today = forecast.list[0];

  return (
    <div className="forecast__content">
      <div className="container">
        <div className="forecast__weather">
          <div>
            <h2 className="forecast__title">
              {forecast.name},{' '}
              <span className="forecast__country">{forecast.country}</span>
            </h2>
            <h2>
              {Math.round(today.main.temp)}
              <sup>o</sup>
            </h2>
          </div>
          <div>
            <p>
              {today.weather[0].main}, {today.weather[0].description}
            </p>
            <div className="forecast__temperatures">
              <p>
                H: {Math.round(today.main.temp_max)}
                <sup>o</sup>
              </p>
              <p>
                L: {Math.round(today.main.temp_min)}
                <sup>o</sup>
              </p>
            </div>
          </div>
        </div>
        <div className="forecast__data">
          {forecast.list.map((item, i) => (
            <div key={item.dt} className="forecast__data_item">
              <p className="forecast__data_item_hours">
                {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={`weather-icon-${item.weather[0].description}`}
              />
              <p className="forecast__data_item_temp">
                {Math.round(item.main.temp)}
                <sup>o</sup>
              </p>
            </div>
          ))}
        </div>
        <div className="forecast__sunrise_sunset">
          <div className="forecast__sunrise_sunset_item sunrise">
            <FiSunrise />
            <span>{getSunTime(forecast.sunrise)}</span>
          </div>
          <div className="forecast__sunrise_sunset_item">
            <FiSunset />
            <span>{getSunTime(forecast.sunset)}</span>
          </div>
        </div>
        <div className="forecast__info">
          {/* Wind */}

          <Tile
            title="Wind"
            icon={<GiWindSlap />}
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDiretion(
              Math.round(today.wind.degree)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />

          {/* Feels like */}

          <Tile
            title="Feels like"
            icon={<CiTempHigh />}
            info={`${Math.round(today.main.feels_like)}°`}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />

          {/* Humidity */}

          <Tile
            title="Humidity"
            icon={<WiHumidity />}
            info={`${today.main.humidity} %`}
            description={`${getHumidityValue(today.main.humidity)}`}
          />
        </div>
        <div className="forecast__info">
          {/* Presipitation */}

          <Tile
            title="Presipitation"
            icon={<BsFillCloudRainFill />}
            info={`${Math.round(today.pop * 1000)} %`}
            description={`${getPop(today.pop)}, clouds at ${
              today.clouds.all
            } %`}
          />

          {/* Pressure */}

          <Tile
            title="Pressure"
            icon={<IoIosTimer />}
            info={`${today.main.pressure} hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />

          {/* Visibility */}

          <Tile
            title="Visibility"
            icon={<MdVisibility />}
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={`${getVisibility(today.visibility)}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ForecastPage;
