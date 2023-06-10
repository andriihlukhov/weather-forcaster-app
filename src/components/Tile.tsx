import React from 'react';
import './Tile.css';

type Props = {
  icon: JSX.Element;
  title: string;
  info: string;
  description: string;
};

function Tile({ title, icon, info, description }: Props) {
  return (
    <div className="forecast__info_item">
      <div className="flex">
        {icon}
        <p>{title}</p>
      </div>
      <p className="tile__info">{info}</p>
      <p className="tile__description">{description}</p>
    </div>
  );
}

export default Tile;
