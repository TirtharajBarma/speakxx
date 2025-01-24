import React from 'react';

const SearchInput = ({ query, setQuery, handleSearch}) => {

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') handleSearch();
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for your questions"
        onKeyDown={handleKeyDown}
        style={{ width: '58%', padding: '10px', fontSize: '16px' }}
      />
      <button
        type="submit"
        onClick={handleSearch}
        style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;