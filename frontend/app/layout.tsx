import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Policy Helper',
  description: 'AI-powered policy and product assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
