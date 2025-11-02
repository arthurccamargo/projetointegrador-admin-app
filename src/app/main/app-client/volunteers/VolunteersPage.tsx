import { useState } from "react";
import { Box, Typography } from "@mui/material";
import VolunteersTable from "./components/volunteers-table";
import {
  useGetAllVolunteersQuery,
  useUpdateUserStatusMutation,
} from "../../../api/AdminApi";
import type { Volunteer } from "../../../../types/volunteer.type";
import ConfirmModal from "../../../shared-components/ConfirmModal";

export default function VolunteersPage() {
  const [page, setPage] = useState(1);
  const { data, refetch } = useGetAllVolunteersQuery();
  const [updateUserStatus, { isLoading: isPatching }] =
    useUpdateUserStatusMutation();
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(
    null
  );
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<"ACTIVE" | "BLOCKED">(
    "ACTIVE"
  );

  // const rowsPerPage = 50;
  // const totalPages = data?.pages ?? 1;

  // const totalItems = data?.count ?? 0;
  const volunteers = (data || []).map((u: any) => ({
    id: u.id,
    fullName: u.volunteerProfile.fullName || "",
    email: u.email || "",
    phone: u.volunteerProfile.phone || "",
    cpf: u.volunteerProfile.cpf || "",
    status: u.status || "",
  }));

  const handleRequestStatusChange = (
    volunteer: Volunteer,
    action: "ACTIVE" | "BLOCKED"
  ) => {
    setSelectedVolunteer(volunteer);
    setTargetStatus(action);
    setStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    setSelectedVolunteer(null);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedVolunteer) return;

    try {
      await updateUserStatus({
        id: selectedVolunteer.id,
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
    if (!selectedVolunteer) return { title: "", message: "", color: "info" };

    const statusMap = {
      PENDING_TO_ACTIVE: {
        title: "Aprovar Voluntário",
        message: `Deseja aprovar o Voluntário "${selectedVolunteer.fullName}"? Ele ficará ativo no sistema.`,
        color: "success" as const,
      },
      PENDING_TO_BLOCKED: {
        title: "Rejeitar Voluntário",
        message: `Deseja rejeitar o Voluntário "${selectedVolunteer.fullName}"? Ele será bloqueado e não poderá acessar o sistema.`,
        color: "error" as const,
      },
      ACTIVE_TO_BLOCKED: {
        title: "Bloquear Voluntário",
        message: `Deseja bloquear o Voluntário "${selectedVolunteer.fullName}"? Ele perderá o acesso ao sistema.`,
        color: "error" as const,
      },
      BLOCKED_TO_ACTIVE: {
        title: "Ativar Voluntário",
        message: `Deseja ativar o Voluntário "${selectedVolunteer.fullName}"? Ele voltará a ter acesso ao sistema.`,
        color: "success" as const,
      },
    };

    const currentStatus = selectedVolunteer.status;
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
          Gerenciar Voluntários
        </Typography>
      </Box>

      <VolunteersTable
        data={volunteers}
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
