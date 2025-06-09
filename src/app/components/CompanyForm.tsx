'use client'; // Indica que este é um Componente Cliente

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Importa o hook principal do React Hook Form
import { Company, CreateCompanyPayload, UpdateCompanyPayload } from '@/app/types/company'; // Importa os tipos
import { useRouter } from 'next/navigation'; // Hook de navegação do Next.js App Router

// Define os tipos para as props do formulário
interface CompanyFormProps {
  company?: Company; // Opcional, para o modo de edição (passa os dados da empresa)
  onSubmit: (data: CreateCompanyPayload | UpdateCompanyPayload) => void; // Função de submissão
  isSubmitting: boolean; // Estado de submissão (para desabilitar botão)
  error: Error | null; // Objeto de erro, se houver
}

export function CompanyForm({ company, onSubmit, isSubmitting, error }: CompanyFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateCompanyPayload | UpdateCompanyPayload>({
    defaultValues: company // Preenche o formulário se estiver no modo de edição
      ? {
          name: company.name,
          document: company.document,
          address: company.address,
          isActive: company.isActive,
        }
      : { isActive: true }, // Valor padrão para 'isActive' ao criar
  });

  // Efeito para resetar o formulário quando os dados da empresa forem atualizados (no modo de edição)
  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        document: company.document,
        address: company.address,
        isActive: company.isActive,
      });
    }
  }, [company, reset]);

  const router = useRouter(); // Instancia o roteador para navegação

  // Função de submissão do formulário
  const handleFormSubmit = (data: CreateCompanyPayload | UpdateCompanyPayload) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
        {company ? 'Editar Empresa' : 'Nova Empresa'}
      </h2>

      {error && <p style={{ color: 'red', marginBottom: '15px' }}>Erro: {error.message}</p>}

      <div style={formGroupStyle}>
        <label htmlFor="name" style={labelStyle}>Nome:</label>
        <input
          id="name"
          {...register('name', { required: 'Nome é obrigatório' })} // Campo obrigatório
          style={inputStyle}
          placeholder="Nome da Empresa"
        />
        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="document" style={labelStyle}>Documento (CNPJ/CPF):</label>
        <input
          id="document"
          {...register('document', { required: 'Documento é obrigatório' })} // Campo obrigatório
          style={inputStyle}
          placeholder="Ex: 12.345.678/0001-90"
        />
        {errors.document && <p style={errorStyle}>{errors.document.message}</p>}
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="address" style={labelStyle}>Endereço:</label>
        <input
          id="address"
          {...register('address')} // Campo opcional
          style={inputStyle}
          placeholder="Endereço completo"
        />
      </div>

      <div style={checkboxGroupStyle}>
        <input
          type="checkbox"
          id="isActive"
          {...register('isActive')} // Checkbox para status ativo/inativo
          style={{ marginRight: '8px' }}
        />
        <label htmlFor="isActive" style={labelStyle}>Ativa</label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button
          type="button"
          onClick={() => router.push('/companies')} // Volta para a lista de empresas
          style={{ ...buttonStyle, backgroundColor: '#6c757d' }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting} // Desabilita o botão enquanto está enviando
          style={{ ...buttonStyle, backgroundColor: '#28a745' }}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}

// Estilos inline básicos para o formulário
const formStyle: React.CSSProperties = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '30px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '18px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#444',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ced4da',
  borderRadius: '5px',
  fontSize: '1em',
  boxSizing: 'border-box', // Garante que padding não aumente a largura total
};

const checkboxGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px 25px',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  fontSize: '1em',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
};

const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '0.85em',
  marginTop: '5px',
};