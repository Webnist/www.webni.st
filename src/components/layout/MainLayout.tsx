import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      {/* 固定ヘッダーの高さ分のpadding-topを追加 */}
      <div
        className="mx-auto max-w-7xl px-6 py-12"
        style={{ paddingTop: 'calc(var(--header-height, 73px) + 3rem)' }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
