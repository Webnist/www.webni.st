'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * ロゴのプロップス
 */
interface FooterLogoProps {
  logo?: {
    icon?: string;
  };
}

/**
 * フッターロゴ（クライアントコンポーネント）
 * 画像のエラーハンドリングのため
 */
export function FooterLogo({ logo }: FooterLogoProps) {
  const [logoIconError, setLogoIconError] = useState(false);

  // WordPressから取得したロゴ、またはフォールバック
  const logoIcon = logo?.icon || '/logo-icon.svg';

  // 外部URLかどうかを判定
  const isExternalUrl = logoIcon.startsWith('http');

  if (process.env.NODE_ENV !== 'production' && logo?.icon) {
    console.log('[FooterLogo] Logo URL:', logo.icon);
  }

  return (
    <Link href="/" className="inline-block transition-opacity duration-200 hover:opacity-80">
      {!logoIconError && logoIcon ? (
        <Image
          src={logoIcon}
          alt="Webnist"
          width={174}
          height={40}
          className="h-8 w-auto object-contain brightness-0 invert"
          onError={() => {
            console.error('[FooterLogo] Failed to load image:', logoIcon);
            setLogoIconError(true);
          }}
          unoptimized={isExternalUrl}
        />
      ) : (
        <span className="text-sm font-semibold text-slate-100">webni.st</span>
      )}
    </Link>
  );
}

