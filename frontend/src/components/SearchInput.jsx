import React from 'react';

const SearchInput = ({ query, setQuery, handleSearch, setQuestionPerPage }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for your questions"
        style={{ width: '58%', padding: '10px', fontSize: '16px' }}
      />
      <button
        type="submit"
        onClick={handleSearch}
        style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}
      >
        Search
      </button>
      <select
        onChange={(e) => setQuestionPerPage(Number(e.target.value))}
        style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}
      >
        <option value={10}>10 questions</option>
        <option value={15}>15 questions</option>
        <option value={20}>20 questions</option>
        <option value={25}>25 questions</option>
    </select>
    </div>
  );
};

export default SearchInput;