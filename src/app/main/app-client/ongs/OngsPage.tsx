import { useState } from "react";
import { Box, Typography } from "@mui/material";
import OngsTable from "./components/ongs-table";
import { useGetAllOngsQuery } from "../../../api/AdminApi";

export default function OngsPage() {
  const [page, setPage] = useState(1);
  const { data } = useGetAllOngsQuery();
  // const rowsPerPage = 50;
  // const totalPages = data?.pages ?? 1;

  // const totalItems = data?.count ?? 0;
  const ongs = (data || []).map((u: any) => ({
    id: u.id,
    name: u.ongProfile.name || "",
    email: u.email || "",
    cnpj: u.ongProfile.cnpj || "",
    description: u.ongProfile.description || "",
    status: u.status || "",
  }));

  return (
    <Box
      sx={{
        backgroundColor: "#F9F9F9",
        margin: "24px",
        padding: "24px",
        paddingTop: "0px",
        marginTop: "12px",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          pt: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: "32px", fontWeight: "700" }}>
          Gerenciar Ongs
        </Typography>
      </Box>

      <OngsTable
        data={ongs}
        page={page}
        setPage={setPage}
        totalPages={1}
        totalItems={0}
      />
    </Box>
  );
}
