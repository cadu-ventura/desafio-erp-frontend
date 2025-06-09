'use client'; // Indica que este é um Componente Cliente (necessário para usar hooks como useQuery)

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Company, CreateCompanyPayload, UpdateCompanyPayload } from '@/app/types/company'; // Importa as interfaces de tipo

// URL base do seu backend NestJS
// ATENÇÃO: Se você já fez o deploy do seu backend, substitua 'http://localhost:3000' pela URL do seu backend deployado!
const API_BASE_URL = 'http://localhost:3000';

// --- Funções para interagir com sua API de Backend ---

// Função para buscar todas as empresas
async function fetchCompanies(): Promise<Company[]> {
  const response = await fetch(`${API_BASE_URL}/companies`);
  if (!response.ok) {
    // Tenta ler o erro do backend se houver (ex: validação)
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao buscar empresas');
  }
  return response.json();
}

// Função para criar uma nova empresa
async function createCompany(payload: CreateCompanyPayload): Promise<Company> {
  const response = await fetch(`${API_BASE_URL}/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao criar empresa');
  }
  return response.json();
}

// Função para atualizar uma empresa existente
async function updateCompany(id: string, payload: UpdateCompanyPayload): Promise<Company> {
  const response = await fetch(`<span class="math-inline">\{API\_BASE\_URL\}/companies/</span>{id}`, {
    method: 'PATCH', // Usamos PATCH no backend para atualização parcial
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao atualizar empresa');
  }
  return response.json();
}

// Função para deletar uma empresa
async function deleteCompany(id: string): Promise<void> {
  const response = await fetch(`<span class="math-inline">\{API\_BASE\_URL\}/companies/</span>{id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao deletar empresa');
  }
  // DELETE retorna 204 No Content, então não há JSON para parsear
}


// --- Hooks Personalizados (usando TanStack Query) ---

// Hook para obter e gerenciar a lista de empresas
export function useCompanies() {
  return useQuery<Company[], Error>({
    queryKey: ['companies'], // Chave única para o cache desta query
    queryFn: fetchCompanies, // Função que faz a requisição
  });
}

// Hook para criar uma empresa
export function useCreateCompany() {
  const queryClient = useQueryClient(); // Obtém o cliente de query para invalidar o cache
  return useMutation<Company, Error, CreateCompanyPayload>({
    mutationFn: createCompany, // Função que faz a requisição de criação
    onSuccess: () => {
      // Após o sucesso da criação, invalida o cache de 'companies' para forçar uma nova busca
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
}

// Hook para atualizar uma empresa
export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation<Company, Error, { id: string; payload: UpdateCompanyPayload }>({
    mutationFn: ({ id, payload }) => updateCompany(id, payload), // Função de mutação
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      // Opcional: queryClient.invalidateQueries({ queryKey: ['company', updatedCompany._id] }); para cache de item único
    },
  });
}

// Hook para deletar uma empresa
export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteCompany, // Função de mutação
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
}