import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { getSiteSettings } from '@/lib/site';
import { ENV } from '@/lib/env';

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

/**
 * WordPressからサイト設定を取得してmetadataを生成します。
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteResponse = await getSiteSettings(ENV.WP_SITE_ID);
    const settings = siteResponse.settings;
    const domain = settings.domain || 'https://webni.st';
    const siteName = settings.display_name || 'webni.st';
    const description = settings.description || settings.tagline || 'Webをいじって、生きていく。';

    // デバッグ用ログ
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Metadata] Site settings:', {
        display_name: settings.display_name,
        description: settings.description,
        tagline: settings.tagline,
        finalDescription: description,
      });
    }

    // OGP画像のURLを取得（オブジェクト形式の場合）
    const ogImage = settings.default_og?.url || `${domain}/og-image.jpg`;
    const ogImageWidth = settings.default_og?.width || 1200;
    const ogImageHeight = settings.default_og?.height || 630;
    const ogImageAlt = settings.default_og?.alt || siteName;

    // Twitterのユーザー名を抽出
    const twitterUrl = settings.sns?.x;
    const twitterCreator = twitterUrl
      ? twitterUrl.includes('@')
        ? twitterUrl.split('@')[1].split('/')[0]
        : twitterUrl.split('/').pop()
      : undefined;

    // descriptionが空でないことを確認
    const finalDescription = description && description.trim() !== ''
      ? description
      : 'Webをいじって、生きていく。';

    const metadata: Metadata = {
      metadataBase: new URL(domain),
      title: {
        default: siteName,
        template: `%s | ${siteName}`,
      },
      description: finalDescription,
      keywords: ['web開発', 'Next.js', 'WordPress', 'ヘッドレスCMS'],
      authors: [{ name: 'Webnist' }],
      creator: 'Webnist',
      publisher: 'Webnist',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      openGraph: {
        type: 'website',
        locale: 'ja_JP',
        url: domain,
        siteName,
        title: siteName,
        description,
        images: [
          {
            url: ogImage,
            width: ogImageWidth,
            height: ogImageHeight,
            alt: ogImageAlt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: siteName,
        description,
        images: [ogImage],
        creator: twitterCreator ? `@${twitterCreator}` : undefined,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
      },
    };

    if (process.env.NODE_ENV !== 'production') {
      console.log('[Metadata] Generated metadata:', {
        title: metadata.title,
        description: metadata.description,
      });
    }

    return metadata;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    // フォールバック
    return {
      title: 'webni.st',
      description: 'Webをいじって、生きていく。',
      openGraph: {
        title: 'webni.st',
        description: 'Webをいじって、生きていく。',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'webni.st',
        description: 'Webをいじって、生きていく。',
      },
    };
  }
}

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
