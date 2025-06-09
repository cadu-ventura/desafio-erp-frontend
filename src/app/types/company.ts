// src/types/company.ts

// Interface para o objeto Company como ele é retornado do seu backend
export interface Company {
  _id: string; // O ID gerado pelo MongoDB
  name: string;
  document: string;
  address?: string; // Opcional, pois pode não ser sempre fornecido
  isActive: boolean;
  createdAt: string; // Campos de timestamp adicionados automaticamente pelo Mongoose
  updatedAt: string;
}

// Interface para o payload (corpo da requisição) ao criar uma empresa
export interface CreateCompanyPayload {
  name: string;
  document: string;
  address?: string;
  isActive?: boolean;
}

// Interface para o payload (corpo da requisição) ao atualizar uma empresa (todos os campos opcionais)
export interface UpdateCompanyPayload {
  name?: string;
  document?: string;
  address?: string;
  isActive?: boolean;
}