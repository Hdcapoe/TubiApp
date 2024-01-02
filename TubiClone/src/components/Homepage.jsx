import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Homepage = () => {
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('movies');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`https://advanced-movie-search.p.rapidapi.com/genre/${selectedCategory}/list`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '393d3bf389msh22ad968edc3f86ep10bee4jsncc2d901b34cf',
            'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${selectedCategory} genres`);
        }

        const data = await response.json();
        setGenres(data.genres);
        setLoadingGenres(false);
      } catch (error) {
        console.error(`Error fetching ${selectedCategory} genres:`, error);
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, [selectedCategory]);

  const handleSearch = async (query) => {
    setLoadingSearch(true);

    try {
      const response = await fetch(`https://advanced-movie-search.p.rapidapi.com/search/${selectedCategory}?query=${query}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '393d3bf389msh22ad968edc3f86ep10bee4jsncc2d901b34cf',
          'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${selectedCategory} search results`);
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error(`Error fetching ${selectedCategory} search results:`, error);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className='homepage'>
      <Navbar onSearch={handleSearch} onSelectCategory={setSelectedCategory} />
      {loadingGenres ? (
        <p>Loading genres...</p>
      ) : (
        <div>
          <h2>{selectedCategory === 'tubiKids' ? 'Family Genres' : 'Movie Genres'}:</h2>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}
      {loadingSearch ? (
        <p>Loading search results...</p>
      ) : (
        <div>
          <h2>{selectedCategory === 'tubiKids' ? 'Family' : 'Search'} Results:</h2>
          <ul>
            {searchResults.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Homepage;
