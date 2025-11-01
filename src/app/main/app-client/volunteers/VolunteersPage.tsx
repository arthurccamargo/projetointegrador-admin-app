import { useState } from "react";
import { Box, Typography } from "@mui/material";
import VolunteersTable from "./components/volunteers-table";

export default function VolunteersPage() {
  const [page, setPage] = useState(1);
  // const rowsPerPage = 50;
  // const totalPages = data?.pages ?? 1;

  // const totalItems = data?.count ?? 0;
  const volunteers = [];

  return (
    <Box sx={{ backgroundColor: "#F9F9F9", margin: "24px", padding: "24px", paddingTop: "0px", marginTop: "12px", borderRadius: 2 }}>
      <Box
        sx={{
          pt: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: "32px", fontWeight: "700" }}>
          Gerenciar Voluntários
        </Typography>
      </Box>

      <VolunteersTable
        data={volunteers}
        page={page}
        setPage={setPage}
        totalPages={1}
        totalItems={0}      />
    </Box>
  );
}
