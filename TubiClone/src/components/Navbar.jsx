import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="navbar">
      <div className="logo">tubi</div>
      <button>Movies</button>
      <button>TV Shows</button>
      <button>Tubi Kids</button>
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
