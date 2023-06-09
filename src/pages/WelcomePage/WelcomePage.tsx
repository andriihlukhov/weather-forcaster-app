import React, { ChangeEvent } from 'react';
import './WelcomePage.css';
import { OptionType } from '../../types';

type Props = {
  inputValue: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: OptionType[];
  onOptionSelect: (option: OptionType) => void;
  onSubmit: () => void;
};

function WelcomePage({
  inputValue,
  onInputChange,
  options,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element {
  return (
    <div className="welcomePage__content">
      <h1 className="welcomePage__title">Weather Forecaster</h1>
      <p className="welcomePage__text">
        Enter below a place you want to know the weather of and choose one from
        the dropdown
      </p>
      <div className="welcomePage__input_button">
        <input
          className="welcomePage__input"
          placeholder="Write the city..."
          type="text"
          value={inputValue}
          onChange={onInputChange}
        />
        <ul className="welcomePage__optionsList">
          {options.map((option: OptionType) => (
            <p className="welcomePage__option" key={option.lat}>
              <button
                className="welcomePage__option_button"
                type="button"
                onClick={() => onOptionSelect(option)}
              >
                {option.name}
              </button>
            </p>
          ))}
        </ul>
        <button
          onClick={onSubmit}
          className="welcomePage__button"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
