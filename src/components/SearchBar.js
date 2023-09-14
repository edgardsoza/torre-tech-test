import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

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
      console.log(firstTenResults); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
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
                <li key={result.ardaID}>
                  <a href={`https://torre.ai/${result.username}`} target="_blank" rel="noopener noreferrer">
                   <img src={result.imageUrl} alt='This is the profile presentation for the user' />
                  </a>
                  <h3>{result.name}</h3>
                  {result.verified ? (
                    <span style={{ marginLeft: '0.5em' }}>✓</span>
                    ) : null}
                  <h3>{result.professionalHeadline}</h3>
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
