'use client'; // Necessário para componentes clientes no App Router

import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Opcional: Ferramentas de desenvolvimento

// Crie uma instância do QueryClient fora do componente para que seja persistente
const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* ReactQueryDevtools é uma ferramenta de depuração útil para o TanStack Query */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}