import React, { useState } from 'react';

const Navbar = ({ onSearch, onSelectCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="navbar">
      <div className="logo">tubi</div>
      <button onClick={() => onSelectCategory('movies')}>Movies</button>
      <button onClick={() => onSelectCategory('tvShows')}>TV Shows</button>
      <button onClick={() => onSelectCategory('tubiKids')}>Tubi Kids</button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Navbar;
