import React, {useState} from 'react';

const SearchResults = ({ results, page, limit }) => {

  const [visibleSolutions, setVisibleSolutions] = useState({});

  const handleShowSolution = (id) => {
    setVisibleSolutions((prev) => ({
      ...prev,
      [id]: !prev[id], 
    }));
  };

  const getSolution = (item) => {
    if(item.type === 'MCQ' && item.options){
      const correctOption = item.options.find((option) => option.isCorrectAnswer);
      return correctOption ? correctOption.text : 'No correct option';
    }
    else if (item.type === 'ANAGRAM'){
      return item.solution || 'no solution provided'
    }

    return null;
  }

  return (
    <div>
      {results.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Number</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={item._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1 + (page - 1) * limit}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {item.title}
                  {item.type === 'MCQ' && item.options && (
                    <ol>
                      {item.options.map((options, idx) => (
                        <li key={idx}>
                          {options.text}
                        </li>
                      ))}
                    </ol>
                  )}
                  {item.type === 'ANAGRAM' && item.blocks && (
                    <ul>
                      {item.blocks.map((block, idx) => (
                        <li key={idx}>
                          {block.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.type}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {["MCQ", "ANAGRAM"].includes(item.type) && (
                      <>
                        <button onClick={() => handleShowSolution(item._id)}>
                          {visibleSolutions[item._id] ? "Hide Solution" : "Show Solution"}
                        </button>
                        {visibleSolutions[item._id] && (
                          <p style={{ marginTop: "8px" }}>
                            <strong>Solution:</strong> {getSolution(item)}
                          </p>
                        )}
                      </>
                    )}
                </td>
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