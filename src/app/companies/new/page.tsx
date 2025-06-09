'use client'; // Indica que este é um Componente Cliente

import React from 'react';
import { CompanyForm } from '@/app/components/CompanyForm'; // Importa o componente de formulário
import { useCreateCompany } from '@/app/hooks/useCompanies'; // Importa o hook de criação
import { useRouter } from 'next/navigation'; // Hook de navegação

export default function NewCompanyPage() {
  const router = useRouter();
  const { mutate: createCompany, isPending, isError, error } = useCreateCompany();

  const handleSubmit = (data: any) => { // data será do tipo CreateCompanyPayload
    createCompany(data, {
      onSuccess: () => {
        alert('Empresa criada com sucesso!'); // Feedback simples ao usuário
        router.push('/companies'); // Redireciona para a lista após a criação
      },
    });
  };

  return (
    <div>
      <CompanyForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        error={isError ? error : null}
      />
    </div>
  );
}