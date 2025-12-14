import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-12">{children}</div>
      <Footer />
    </div>
  );
}
