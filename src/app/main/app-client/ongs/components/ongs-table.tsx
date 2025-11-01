import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  TableFooter,
} from '@mui/material';
import type { Ong } from '../../../../../types/ong.type';
import { CustomPagination } from '../../../../shared-components/CustomPagination';

interface OngsTableProps {
  data: Ong[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
}

export default function OngsTable({
  data,
  page,
  setPage,
  totalPages,
  totalItems,
}: OngsTableProps) {
  const rowsPerPage = 50;
  const paginatedRows = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        maxHeight: 'calc(94vh - 150px)',
        '@media (max-height: 768px)': {
          maxHeight: 'calc(94vh - 100px)',
        },
        overflowY: 'auto',
        width: '100%',
        overflowX: 'auto',
      }}
    >
      <Table stickyHeader sx={{ minWidth: 1040, zIndex: 1, border: '1px solid #E5E7EB' }} aria-label="tabela de ongs">
        <TableHead
          sx={{
            '& th': {
              backgroundColor: '#F9F9F9',
              borderBottom: '1px solid #E5E7EB',
              borderRight: '1px solid #E5E7EB',
              padding: '8px 12px',
              '&:last-child': {
                borderRight: 'none',
              },
            },
            '& .MuiTableCell-stickyHeader': {
              backgroundColor: '#F9F9F9',
              borderBottom: '1px solid #E5E7EB',
              borderRight: '1px solid #E5E7EB',
              padding: '8px 12px',
              '&:last-child': {
                borderRight: 'none',
              },
            },
          }}
        >
          <TableRow>
            <TableCell align="center">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Ações
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Nome
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Email
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mr: 1 }}>
                  CNPJ
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Descrição
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            '& .MuiTableCell-root': {
              borderBottom: '1px solid #E5E7EB',
              borderRight: '1px solid #E5E7EB',
              padding: '8px 16px',
              '&:last-child': {
                borderRight: 'none',
              },
            },
          }}
        >
          {paginatedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
                <Typography variant="body1" color="black">
                  Nenhuma ong encontrada
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginatedRows.map((row, index) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#F6F8FA' : 'white',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'inherit' }}>
                      {row.name || 'Não informado'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: 'inherit' }}>
                      {row.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: 'inherit', fontFamily: 'monospace' }}>
                      {row.cnpj}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: 'inherit' }}>
                      {row.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter
          sx={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: '#fff',
            borderTop: '1px solid #E5E7EB',
            zIndex: 2,
          }}
        >
          <TableRow>
            <TableCell colSpan={5} sx={{ borderTop: '1px solid #E5E7EB', py: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    color: '#111827',
                    fontWeight: 500,
                  }}
                >
                  Mostrando {data.length} de {totalItems} resultados
                </Typography>
                <CustomPagination page={page} setPage={setPage} totalPages={totalPages} />
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
