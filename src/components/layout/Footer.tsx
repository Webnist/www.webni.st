import { getMenu } from '@/lib/menu';
import { getSiteSettings } from '@/lib/site';
import { ENV } from '@/lib/env';
import { FooterNav } from './FooterNav';
import { FooterLogo } from './FooterLogo';
import type { MenuItem } from '@/types/menu';

/**
 * フッター（サーバーコンポーネント）
 * @returns フッター
 */
export async function Footer() {
  const year = new Date().getFullYear();
  let menuItems: MenuItem[] = [];
  let logo: { icon?: string } | undefined;

  try {
    const [menuResponse, siteResponse] = await Promise.all([
      getMenu({
        siteId: ENV.WP_SITE_ID,
        area: 'footer',
      }),
      getSiteSettings(ENV.WP_SITE_ID),
    ]);
    menuItems = menuResponse.items || [];

    // ロゴ情報を取得
    if (siteResponse.settings.logo?.url) {
      logo = {
        icon: siteResponse.settings.logo.url,
      };
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Footer] Logo URL:', siteResponse.settings.logo.url);
      }
    }
  } catch (error) {
    console.error('Failed to fetch footer data:', error);
    // エラーが発生してもフッターは表示する（メニューなし、ロゴなし）
  }

  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/50">
      <div className="mx-auto max-w-[1240px] px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* ロゴ */}
          <div>
            <FooterLogo logo={logo} />
          </div>

          {/* フッターメニュー */}
          {menuItems.length > 0 && (
            <div className="md:flex md:items-start">
              <FooterNav items={menuItems} />
            </div>
          )}
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 text-center md:text-left">
            © {year} Webnist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
