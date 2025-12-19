'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * ロゴのプロップス
 */
interface HeaderLogoProps {
  logo?: {
    icon?: string;
  };
}

/**
 * ヘッダーロゴ（クライアントコンポーネント）
 * 画像のエラーハンドリングのため
 */
export function HeaderLogo({ logo }: HeaderLogoProps) {
  const [logoIconError, setLogoIconError] = useState(false);

  // WordPressから取得したロゴ、またはフォールバック
  const logoIcon = logo?.icon || '/logo-icon.svg';

  // 外部URLかどうかを判定
  const isExternalUrl = logoIcon.startsWith('http');

  if (process.env.NODE_ENV !== 'production' && logo?.icon) {
    console.log('[HeaderLogo] Logo URL:', logo.icon);
  }

  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Logo Icon */}
      <div className="w-[174px] h-10 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        {!logoIconError && logoIcon ? (
          <Image
            src={logoIcon}
            alt="Webnist"
            width={174}
            height={40}
            className="w-full h-full object-contain"
            onError={() => {
              console.error('[HeaderLogo] Failed to load image:', logoIcon);
              setLogoIconError(true);
            }}
            unoptimized={isExternalUrl}
          />
        ) : (
          <span className="text-base font-bold tracking-wide text-[#ff9600]">W</span>
        )}
      </div>
    </Link>
  );
}

