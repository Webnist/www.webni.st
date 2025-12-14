import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import '@/styles/globals.css';
import { MainLayout } from '@/components/layout/MainLayout';

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "webni.st",
  description: "Webをいじって、生きていく。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} antialiased`}
      >
		<MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
