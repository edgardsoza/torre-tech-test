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
    }, 200);
    return () => clearTimeout(delayTimer);
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'https://arda.torre.co/entities/_search/',
        { query },
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
};

  const removeFromFavorites = (favoriteToRemove) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.ggId !== favoriteToRemove.ggId,
    );
    setFavorites(updatedFavorites);
  };

  return (
    <div className="container">
      <FavoriteList favorites={favorites} removeFromFavorites={removeFromFavorites} />
      <input
        className="input-box"
        type="text"
        placeholder="Search for individuals..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="search-container">
        {results.length > 0 ? (
          <div className="cards-container">
            <h2>Search Results</h2>
            <ul className="card-list">
              {results.map((result) => (
                <div className="result-card" key={result.ardaId}>
                  <li className="card-properties">
                    <a className="profile-picture" href={`https://torre.ai/${result.username}`} target="_blank" rel="noopener noreferrer">
                      <img className="torre-profile" src={result.imageUrl} alt="Profile image" />
                    </a>
                    <div className="name-container">
                      <h3>{result.name}</h3>
                      {result.verified ? (
                      <span style={{ marginLeft: '0.5em' }}>✓</span>
                      ) : null}
                    </div>
                    <div className='professional-section'>
                      <h3>{result.professionalHeadline}</h3>
                      <button className="add-button" type="submit" onClick={() => addToFavorites(result)}>Save to Favorite</button>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
