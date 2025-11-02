export const getUserStatus = (status?: string) => {
  const s = (status || "").toUpperCase();

  const map: Record<string, { label: string; bg: string; color: string }> = {
    PENDING: { label: "PENDENTE", bg: "#FBBF24", color: "#111827" },
    ACTIVE: { label: "ATIVO", bg: "#10B981", color: "#ffffff" },
    BLOCKED: { label: "BLOQUEADO", bg: "#EF4444", color: "#ffffff" },
  };

  return map[s] || { label: status || "Não informado", bg: "#9CA3AF", color: "#ffffff" };
};
