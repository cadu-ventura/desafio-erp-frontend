'use client'; // Indica que este é um Componente Cliente

import React from 'react';
import { CompanyForm } from '@/app/components/CompanyForm';
import { useCompanies, useUpdateCompany } from '@/app/hooks/useCompanies'; // Reutiliza useCompanies para buscar uma única empresa
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // Hook para obter parâmetros da URL (App Router)

export default function EditCompanyPage() {
  const router = useRouter();
  const params = useParams(); // Obtém os parâmetros da URL
  const companyId = params.id as string; // Assume que o ID é uma string

  // Busca todas as empresas e filtra para encontrar a empresa específica pelo ID.
  // Uma implementação mais otimizada para grandes listas seria usar useQuery para buscar apenas uma empresa pelo ID,
  // mas para um desafio, buscar todas e filtrar é mais simples e funcional.
  const { data: companies, isLoading, isError: isFetchError, error: fetchError } = useCompanies();
  const companyToEdit = companies?.find(comp => comp._id === companyId);

  const { mutate: updateCompany, isPending, isError: isUpdateError, error: updateError } = useUpdateCompany();

  const handleSubmit = (data: any) => { // data será do tipo UpdateCompanyPayload
    updateCompany({ id: companyId, payload: data }, {
      onSuccess: () => {
        alert('Empresa atualizada com sucesso!');
        router.push('/companies'); // Redireciona para a lista após a atualização
      },
    });
  };

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando dados da empresa...</div>;
  }

  if (isFetchError) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Erro ao carregar empresa: {fetchError?.message}</div>;
  }

  if (!companyToEdit) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'orange' }}>Empresa não encontrada.</div>;
  }

  return (
    <div>
      <CompanyForm
        company={companyToEdit} // Passa os dados da empresa para edição
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        error={isUpdateError ? updateError : null}
      />
    </div>
  );
}