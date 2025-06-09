import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '../app/providers/query-provider'; // Importe seu QueryProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Desafio ERP Frontend', // Você pode mudar o título aqui
  description: 'Interface para o desafio técnico do ERP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider> {/* Envolva toda a aplicação aqui */}
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}