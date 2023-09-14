import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteList from './FavoriteList';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {

    const delayTimer = setTimeout(() => {
      if (query.trim() !== '') {
        handleSearch();
      }
    }, 500);
    return () => clearTimeout(delayTimer);
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'https://arda.torre.co/entities/_search/',
        { query }
      );
      const firstTenResults = response.data.results.slice(0, 10);
      setResults(firstTenResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addToFavorites = (favorite) => {
    if (!favorites.some((f) => f.ggId === favorite.ggId)) {
    setFavorites([...favorites, favorite]);
    }
    console.log(localStorage)
};

  const removeFromFavorites = (favoriteToRemove) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.ggId !== favoriteToRemove.ggId
    );
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <FavoriteList favorites={favorites} removeFromFavorites={removeFromFavorites} />
      <input
        type="text"
        placeholder="Search for individuals..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {results.length > 0 ? (
          <div>
            <h2>Search Results</h2>
            <ul style={{ listStyleType: 'none' }}>
              {results.map((result) => (
                <li key={result.ardaId}>
                  <a href={`https://torre.ai/${result.username}`} target="_blank" rel="noopener noreferrer">
                   <img src={result.imageUrl} alt='This is the profile presentation for the user' />
                  </a>
                  <h3>{result.name}</h3>
                  {result.verified ? (
                    <span style={{ marginLeft: '0.5em' }}>✓</span>
                    ) : null}
                  <h3>{result.professionalHeadline}</h3>
                  <button onClick={() => addToFavorites(result)}>Save to Favorite</button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
