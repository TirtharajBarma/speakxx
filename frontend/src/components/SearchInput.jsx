import React from 'react';

const SearchInput = ({ query, setQuery, handleSearch, type, setType}) => {

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
      <select value={type} 
      onChange={(e) => setType(e.target.value)} 
      style={{ padding: '10px', fontSize: '16px', marginLeft: '10px', marginRight: '10px' }}>
        <option value="all">All</option>
        <option value="MCQ">MCQ</option>
        <option value="ANAGRAM">Anagram</option>
        <option value="READ_ALONG">Read-Along</option>
        <option value="CONTENT_ONLY">Content-only</option>
      </select>
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