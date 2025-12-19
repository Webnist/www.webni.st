import { getMenu } from '@/lib/menu';
import { getSiteSettings } from '@/lib/site';
import { ENV } from '@/lib/env';
import { HeaderNav } from './HeaderNav';
import { HeaderLogo } from './HeaderLogo';
import type { MenuItem } from '@/types/menu';

/**
 * ヘッダー（サーバーコンポーネント）
 * @returns ヘッダー
 */
export async function Header() {
  let menuItems: MenuItem[] = [];
  let logo: { icon?: string } | undefined;

  try {
    const [menuResponse, siteResponse] = await Promise.all([
      getMenu({
        siteId: ENV.WP_SITE_ID,
        area: 'header',
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
        console.log('[Header] Logo URL:', siteResponse.settings.logo.url);
      }
    }
  } catch (error) {
    console.error('Failed to fetch header data:', error);
    // エラーが発生してもヘッダーは表示する（メニューなし、ロゴなし）
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-surface" id="main-header">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <HeaderLogo logo={logo} />
          <HeaderNav items={menuItems} />
        </nav>
      </div>
    </header>
  );
}
