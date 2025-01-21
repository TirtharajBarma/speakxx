import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ count, currentPage, handlePageChange }) => {
  return (
    <Stack spacing={2}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px auto'}}>
        <Pagination
          count={count}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": { color: "black" },
            "& .Mui-selected": { backgroundColor: "white", color: "black" },
          }}
        />
      </div>
    </Stack>
  );
};

export default PaginationComponent;