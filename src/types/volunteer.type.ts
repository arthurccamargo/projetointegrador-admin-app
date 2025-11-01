export interface Volunteer {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  birthDate?: string | null;
  phone?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string | null;
  neighborhood?: string;
  city?: string;
  state?: string;
  experiences?: string | null;
}

export type SortKey = 'name' | 'email';
