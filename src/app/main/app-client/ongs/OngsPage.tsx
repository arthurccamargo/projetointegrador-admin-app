import { useState } from "react";
import { Search } from "lucide-react";
import { Box, Container, TextField, Typography } from "@mui/material";

export default function OngsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Container
      maxWidth="lg"
      sx={{ py: 2, minHeight: "100vh", position: "relative", mb: 2 }}
    >
      <Box mb={8}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" mb={2}>
          Meus Eventos
        </Typography>
        <Typography color="text.common.black" mb={3}>
          Gerencie seus eventos e candidatos
        </Typography>
        <Box maxWidth={400}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                  <Search size={20} style={{ color: "#9ca3af" }} />
                </Box>
              ),
            }}
            size="small"
          />
        </Box>
      </Box>
    </Container>
  );
}
