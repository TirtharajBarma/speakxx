import React, { useState } from 'react';
import axios from 'axios';
import { SearchInput, SearchResults, PaginationComponent } from './components';
import config from './config/config';
import './App.css'

function App() {
  const [query, setQuery] = useState(''); 
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0);      // total page -> per page
  const [type, setType] = useState('all');


  const fetchResults = async(newPage = 1) => {
      if (!query.trim()) return; 
      setLoading(true);

      try {
        const response = await axios.get(`${config.apiUrl}/api/search`, {
          params: { query, page: 1, limit: 10, type }
        });
    
        setResults(response.data.results);
        setTotalPages(response.data.totalPages);
        setPage(newPage);
  
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
  }

  // fetch the 1st page of the new query
  const handleSearch = async() => {
      fetchResults(1);
  };

  const handlePageChange = async(newPage) => {
      fetchResults(newPage);
};

  return (
    <div className='container'>
      <h1 style={{textAlign: 'center'}}>Search App</h1>

      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        type={type}
        setType={setType}
      />

      {loading && (
        <div className="spinner">
          <div></div>
        </div>
      )}

      {!loading && results.length > 0 && (
          <div>
            <SearchResults results={results} page={page} limit={10} />
              <PaginationComponent
                  currentPage={page}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
              />
          </div>
      )}

      {!loading && results.length === 0 && <p>No results found</p>}

    </div>
  );
}

export default App;