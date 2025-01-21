import React, {useState, useEffect} from 'react';
import {SearchInput, SearchResults, PaginationComponent} from './components/index'
import axios from 'axios'

function App() {

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionPerPage, setQuestionPerPage] = useState(10);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setCurrentPage(1);

    try {
      const res = await axios.get('http://localhost:5001/api/search', {
        params: { query },
      });
      setResults(res.data);
    } catch (error) {
      console.error('Error fetching search results', error);
      setResults([]);
    } 
    finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * questionPerPage;
  const endIndex = startIndex + questionPerPage;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', border: '1px solid gray' }}>
    <h1>Search Questions</h1>
    <p>Total Questions: {results.length}</p>

    <SearchInput query={query} setQuery={setQuery} handleSearch={handleSearch} setQuestionPerPage={setQuestionPerPage}/>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <SearchResults results={results} startIndex={startIndex} endIndex={endIndex} />
    )}

    <PaginationComponent
      count={Math.ceil(results.length / questionPerPage)}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
    />
  </div>
  )
}

export default App
