'use client'; // Indica que este é um Componente Cliente (necessário para usar hooks como useCompanies)

import React from 'react';
import Link from 'next/link'; // Componente Link do Next.js para navegação
import { useCompanies, useDeleteCompany } from '@/app/hooks/useCompanies'; // Importa os hooks personalizados
import type { Company } from '@/app/types/company'; // Importa a interface Company

export default function CompaniesPage() {
  const { data: companies, isLoading, isError, error } = useCompanies(); // Hook para listar empresas
  const { mutate: deleteCompanyMutation } = useDeleteCompany(); // Hook para deletar empresas

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando empresas...</div>;
  }

  if (isError) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Erro ao carregar empresas: {error?.message}</div>;
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar esta empresa?')) {
      deleteCompanyMutation(id);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Gerenciamento de Empresas</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Link href="/companies/new" passHref style={{ backgroundColor: '#0070f3', color: 'white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
          Adicionar Nova Empresa
        </Link>
      </div>

      {companies && companies.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>Nenhuma empresa encontrada.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>Nome</th>
              <th style={tableHeaderStyle}>Documento</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((company: Company) => (
              <tr key={company._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tableCellStyle}>{company.name}</td>
                <td style={tableCellStyle}>{company.document}</td>
                <td style={tableCellStyle}>{company.isActive ? 'Ativa' : 'Inativa'}</td>
                <td style={tableCellStyle}>
                  <Link href={`/companies/${company._id}`} passHref style={{ marginRight: '10px', color: '#0070f3', textDecoration: 'none' }}>
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(company._id)}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  padding: '12px 8px',
  border: '1px solid #ddd',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#555',
};

const tableCellStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #ddd',
  textAlign: 'left',
};