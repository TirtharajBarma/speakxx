import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <Stack spacing={2} alignItems="center" marginTop="20px">
      <Pagination
        count={totalPages} 
        page={currentPage} 
        onChange={(event, page) => handlePageChange(page)} 
        color="secondary"
        sx={{
            '& .Mui-selected': {
              backgroundColor: '#007bff',
              color: 'white', 
            },
          }}
      />
    </Stack>
  );
};

export default PaginationComponent;