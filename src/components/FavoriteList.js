// FavoriteList.js
import React from 'react';

const FavoriteList = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorite-container">
      <h1>Favorites</h1>
      <ul className="favorite-list">
        {favorites.map((favorite) => (
          <li className="favorite-item" key={favorite.ggId}>
            <a className="favorite-name" href={`https://torre.ai/${favorite.username}`} target="_blank" rel="noopener noreferrer">
              <p>{favorite.name}</p>
            </a>
            <button className="remove-button" type="button" onClick={() => removeFromFavorites(favorite)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
