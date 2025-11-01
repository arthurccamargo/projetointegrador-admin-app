import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button } from '@mui/material';


export function CustomPagination({ page, setPage, totalPages }: { page: number; setPage: (page: number) => void; totalPages: number }) {
  const maxButtons = 5;
  const buttons = [];

  if (totalPages <= maxButtons) {
    // Mostra todas as páginas se totalPages <= maxButtons
    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(
        <Button
          key={i}
          variant={page === i ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          sx={{ minWidth: 32, mx: 0.5, borderRadius: 2, fontWeight: 600 }}
          onClick={() => setPage(i)}
        >
          {i}
        </Button>,
      );
    }
  } else if (page <= 3) {
    // Início: [1][2][3][4][...]
    for (let i = 1; i <= 4; i += 1) {
      buttons.push(
        <Button
          key={i}
          variant={page === i ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          sx={{ minWidth: 32, mx: 0.5, borderRadius: 2, fontWeight: 600 }}
          onClick={() => setPage(i)}
        >
          {i}
        </Button>,
      );
    }
    buttons.push(
      <Button
        key="end-ellipsis"
        variant="text"
        color="primary"
        size="small"
        sx={{ minWidth: 32, mx: 0.5, borderRadius: 2, pointerEvents: 'none' }}
        disabled
      >
        <MoreHorizIcon fontSize="small" />
      </Button>,
    );
  } else if (page >= totalPages - 2) {
    // Fim: [...][N-3][N-2][N-1][N]
    buttons.push(
      <Button
        key="start-ellipsis"
        variant="text"
        color="primary"
        size="small"
        sx={{ minWidth: 32, mx: 0.5, borderRadius: 2, pointerEvents: 'none' }}
        disabled
      >
        <MoreHorizIcon fontSize="small" />
      </Button>,
    );
    for (let i = totalPages - 3; i <= totalPages; i += 1) {
      buttons.push(
        <Button
          key={i}
          variant={page === i ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          sx={{ minWidth: 32, mx: 0.5, borderRadius: 2, fontWeight: 600 }}
          onClick={() => setPage(i)}
        >
          {i}
        </Button>,
      );
    }
  } else {
    // Meio: [...][P-1][P][P+1][...]
    buttons.push(
      <Button
        key="start-ellipsis"
        variant="text"
        color="primary"
        size="small"
        sx={{ minWidth: 32, mx: 0.5, borderRadius: 2, pointerEvents: 'none' }}
        disabled
      >
        <MoreHorizIcon fontSize="small" />
      </Button>,
    );
    for (let i = page - 1; i <= page + 1; i += 1) {
      buttons.push(
        <Button
          key={i}
          variant={page === i ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          sx={{ minWidth: 32, mx: 0.5, borderRadius: 2, fontWeight: 600 }}
          onClick={() => setPage(i)}
        >
          {i}
        </Button>,
      );
    }
    buttons.push(
      <Button
        key="end-ellipsis"
        variant="text"
        color="primary"
        size="small"
        sx={{ minWidth: 32, mx: 0.5, borderRadius: 2, pointerEvents: 'none' }}
        disabled
      >
        <MoreHorizIcon fontSize="small" />
      </Button>,
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        sx={{ minWidth: 32, mx: 0.5, borderRadius: 2 }}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        {'<'}
      </Button>
      {buttons}
      <Button
        variant="outlined"
        color="primary"
        size="small"
        sx={{ minWidth: 32, mx: 0.5, borderRadius: 2 }}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        {'>'}
      </Button>
    </Box>
  );
}
