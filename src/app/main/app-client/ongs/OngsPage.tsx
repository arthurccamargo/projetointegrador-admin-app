import { useState } from "react";
import { Box, Typography } from "@mui/material";
import OngsTable from "./components/ongs-table";
import { useGetAllOngsQuery, useUpdateUserStatusMutation } from "../../../api/AdminApi";
import type { Ong } from "../../../../types/ong.type";
import ConfirmModal from "../../../shared-components/ConfirmModal";

export default function OngsPage() {
  const [page, setPage] = useState(1);
  const { data, refetch } = useGetAllOngsQuery();
  const [updateUserStatus, { isLoading: isPatching }] = useUpdateUserStatusMutation();
  
  const [selectedOng, setSelectedOng] = useState<Ong | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<"ACTIVE" | "BLOCKED">("ACTIVE");
  
  // const rowsPerPage = 50;
  // const totalPages = data?.pages ?? 1;
  // const totalItems = data?.count ?? 0;
  
  const ongs = (data || []).map((u: { id: string; ongProfile: { name: string; cnpj: string; description: string }; email: string; status: string }) => ({
    id: u.id,
    name: u.ongProfile.name || "",
    email: u.email || "",
    cnpj: u.ongProfile.cnpj || "",
    description: u.ongProfile.description || "",
    status: u.status || "",
  }));

  const handleRequestStatusChange = (ong: Ong, action: "ACTIVE" | "BLOCKED") => {
    setSelectedOng(ong);
    setTargetStatus(action);
    setStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    setSelectedOng(null);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedOng) return;
    
    try {
      await updateUserStatus({
        id: selectedOng.id,
        status: targetStatus,
      }).unwrap();
      
      await refetch();
      handleCloseStatusModal();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      throw error;
    }
  };

  const getModalContent = (): {
    title: string;
    message: string;
    color: "success" | "error" | "warning" | "info";
  } => {
    if (!selectedOng) return { title: "", message: "", color: "info" };
    
    const statusMap = {
      PENDING_TO_ACTIVE: {
        title: "Aprovar ONG",
        message: `Deseja aprovar a ONG "${selectedOng.name}"? Ela ficará ativa no sistema.`,
        color: "success" as const,
      },
      PENDING_TO_BLOCKED: {
        title: "Rejeitar ONG",
        message: `Deseja rejeitar a ONG "${selectedOng.name}"? Ela será bloqueada e não poderá acessar o sistema.`,
        color: "error" as const,
      },
      ACTIVE_TO_BLOCKED: {
        title: "Bloquear ONG",
        message: `Deseja bloquear a ONG "${selectedOng.name}"? Ela perderá o acesso ao sistema.`,
        color: "error" as const,
      },
      BLOCKED_TO_ACTIVE: {
        title: "Ativar ONG",
        message: `Deseja ativar a ONG "${selectedOng.name}"? Ela voltará a ter acesso ao sistema.`,
        color: "success" as const,
      },
    };

    const currentStatus = selectedOng.status;
    const key = `${currentStatus}_TO_${targetStatus}` as keyof typeof statusMap;
    
    return statusMap[key] || statusMap.ACTIVE_TO_BLOCKED;
  };

  const modalContent = getModalContent();

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
        onRequestStatusUser={handleRequestStatusChange}
      />

      <ConfirmModal
        open={statusModalOpen}
        onClose={handleCloseStatusModal}
        title={modalContent.title}
        message={modalContent.message}
        color={modalContent.color}
        onConfirm={handleConfirmStatusChange}
        loading={isPatching}
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
      />
    </Box>
  );
}
