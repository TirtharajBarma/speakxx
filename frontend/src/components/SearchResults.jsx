import React from 'react';

const SearchResults = ({ results, startIndex, endIndex }) => {
  return (
    <div>
      {results.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Number</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {results.slice(startIndex, endIndex).map((item, index) => (
              <tr key={item._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{startIndex + index + 1}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.title}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No result found</p>
      )}
    </div>
  );
};

export default SearchResults;