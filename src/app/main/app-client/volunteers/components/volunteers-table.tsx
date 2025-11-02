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
  Tooltip,
  FormControlLabel,
} from "@mui/material";
import { CustomPagination } from "../../../../shared-components/CustomPagination";
import type { Volunteer } from "../../../../../types/volunteer.type";
import { getUserStatus } from "../../../../shared-components/functions/getUserStatus";
import { IOSSwitch } from "../../../../shared-components/SwitchOnOff";

interface VolunteersTableProps {
  data: Volunteer[];
  onRequestStatusUser: (user: Volunteer, action: "ACTIVE" | "BLOCKED") => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
}

export default function VolunteersTable({
  data,
  onRequestStatusUser,
  page,
  setPage,
  totalPages,
  totalItems,
}: VolunteersTableProps) {
  const rowsPerPage = 50;
  const paginatedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleToggleStatus = (volunteer: Volunteer) => {
    const newStatus = volunteer.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    onRequestStatusUser(volunteer, newStatus);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        maxHeight: "calc(94vh - 150px)",
        "@media (max-height: 768px)": {
          maxHeight: "calc(94vh - 100px)",
        },
        overflowY: "auto",
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Table
        stickyHeader
        sx={{ minWidth: 1040, zIndex: 1, border: "1px solid #E5E7EB" }}
        aria-label="tabela de voluntários"
      >
        <TableHead
          sx={{
            "& th": {
              backgroundColor: "#F9F9F9",
              borderBottom: "1px solid #E5E7EB",
              borderRight: "1px solid #E5E7EB",
              padding: "8px 12px",
              "&:last-child": {
                borderRight: "none",
              },
            },
            "& .MuiTableCell-stickyHeader": {
              backgroundColor: "#F9F9F9",
              borderBottom: "1px solid #E5E7EB",
              borderRight: "1px solid #E5E7EB",
              padding: "8px 12px",
              "&:last-child": {
                borderRight: "none",
              },
            },
          }}
        >
          <TableRow>
            <TableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Ações
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Status
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Nome
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Email
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mr: 1 }}>
                  CPF
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Telefone
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& .MuiTableCell-root": {
              borderBottom: "1px solid #E5E7EB",
              borderRight: "1px solid #E5E7EB",
              padding: "8px 16px",
              "&:last-child": {
                borderRight: "none",
              },
            },
          }}
        >
          {paginatedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
                <Typography variant="body1" color="black">
                  Nenhum voluntário encontrado
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginatedRows.map((row, index) => {
              const isActive = row.status === "ACTIVE";

              return (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F6F8FA" : "white",
                    transition: "all 0.3s ease",
                  }}
                >
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Tooltip title={isActive ? "Bloquear Voluntário" : "Ativar Voluntário"}>
                        <FormControlLabel
                          control={
                            <IOSSwitch
                              sx={{ m: 0 }}
                              checked={isActive}
                              onChange={() => handleToggleStatus(row)}
                            />
                          }
                          label=""
                          sx={{ margin: 0, gap: 1 }}
                        />
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {(() => {
                      const info = getUserStatus(row.status);
                      return (
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 1.2,
                            py: 0.4,
                            borderRadius: 1,
                            backgroundColor: info.bg,
                            color: info.color,
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          {info.label}
                        </Box>
                      );
                    })()}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: "inherit" }}
                    >
                      {row.fullName || "Não informado"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: "inherit" }}>
                      {row.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{ color: "inherit", fontFamily: "monospace" }}
                    >
                      {row.cpf}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: "inherit" }}>
                      {row.phone || "Não informado"}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            borderTop: "1px solid #E5E7EB",
            zIndex: 2,
          }}
        >
          <TableRow>
            <TableCell
              colSpan={5}
              sx={{ borderTop: "1px solid #E5E7EB", py: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    left: 0,
                    color: "#111827",
                    fontWeight: 500,
                  }}
                >
                  Mostrando {data.length} de {totalItems} resultados
                </Typography>
                <CustomPagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
