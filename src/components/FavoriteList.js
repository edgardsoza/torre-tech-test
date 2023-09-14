// FavoriteList.js
import React, { useState } from 'react';

const FavoriteList = ({ favorites, addToFavorites, removeFromFavorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.ggId}>
            <span>{favorite.name}</span>
            <button onClick={() => removeFromFavorites(favorite)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
