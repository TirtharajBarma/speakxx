import React, {useState} from 'react'
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Search.css'

const SearchPage = () => {

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionPerPage, setQuestionPerPage] = useState(10);

    const startIndex = (currentPage - 1) * questionPerPage;
    const endIndex = startIndex + questionPerPage;

    const handlePageChange = (event, page) => {
        setCurrentPage(page); // Update the current page
    };

    const handleSearch = async() => {
        if(!query) return;
        setLoading(true);

        try {
            const res = await axios.get('http://localhost:5001/api/search', {
                params: {query},
            })
            setResult(res.data);
        } catch (error) {
            console.error('error fetching the search result', error);
            setResult([]);
        } finally {
            setLoading(false);
        }

    }

  return (
    <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Search questions</h1>
      <p>Total Questions {result.length}</p>
      
      <div style={{marginBottom: '20px'}}>
        <input 
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='search for your term'
        style={{width: '80px', padding: '10px', fontSize: '16px'}}
        />
        <button type="submit" onClick={handleSearch} style={{padding: '10px', fontSize: '16px', marginLeft: '10px'}}>Search</button>

        <select onChange={(e) => setQuestionPerPage(e.target.value)}>
            <option value={10}>10 pages</option>
            <option value={15}>15 pages</option>
            <option value={20}>20 pages</option>
            <option value={25}>25 pages</option>
        </select>

      </div>

        {loading ? (
            <p>Loading.....</p>
        ) : (
            <div>
                {result.length > 0 ? (
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th style={{border: '1px solid #ddd', padding: '8px'}}>Number</th>
                                <th style={{border: '1px solid #ddd', padding: '8px'}}>Title</th>
                                <th style={{border: '1px solid #ddd', padding: '8px'}}>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.slice(startIndex, endIndex).map((items, index) => (
                                <tr key={items._id}>
                                    <th style={{border: '1px solid #ddd', padding: '8px'}}>{index + 1}</th>
                                    <th style={{border: '1px solid #ddd', padding: '8px'}}>{items.title}</th>
                                    <th style={{border: '1px solid #ddd', padding: '8px'}}>{items.type}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p> No result found </p>
                )}
            </div>
        )}

        <Stack spacing={2}>
            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(result.length / questionPerPage)} // Total pages
                    page={currentPage} // Current page
                    onChange={handlePageChange} // Handle page change
                    sx={{
                        "& .MuiPaginationItem-root": { color: "black" }, // Text color
                        "& .Mui-selected": { backgroundColor: "white", color: "black" }, // Selected item styles
                    }} 
                />
            </div>
        </Stack>

    </div>
  )
}

export default SearchPage
