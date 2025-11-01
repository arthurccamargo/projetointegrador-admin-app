export type Ong = {
  id: string;
  userId: string;
  email: string;
  password: string;
  cnpj: string;
  name: string;
  description?: string;
  cep: string;
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  responsibleName: string;
  responsibleCpf: string;
  responsibleEmail: string;
  documentUrl?: string;
  status?: string;
}

export type SortKey = 'name' | 'email';