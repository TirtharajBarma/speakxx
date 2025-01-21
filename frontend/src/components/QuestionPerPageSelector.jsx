import React from 'react';

const QuestionPerPageSelector = ({ setQuestionPerPage }) => {
  return (
    <select
      onChange={(e) => setQuestionPerPage(Number(e.target.value))}
      style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}
    >
      <option value={10}>10 questions</option>
      <option value={15}>15 questions</option>
      <option value={20}>20 questions</option>
      <option value={25}>25 questions</option>
    </select>
  );
};

export default QuestionPerPageSelector;