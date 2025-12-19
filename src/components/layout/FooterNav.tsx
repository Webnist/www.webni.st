'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MenuItem } from '@/types/menu';

/**
 * URLが現在のパスと一致するかチェックします。
 */
function isActiveUrl(url: string, currentPath: string): boolean {
  try {
    const urlObj = new URL(url);
    const urlPath = urlObj.pathname;
    return urlPath === currentPath || currentPath.startsWith(urlPath + '/');
  } catch {
    return url === currentPath || currentPath.startsWith(url + '/');
  }
}

/**
 * フッターメニューアイテム
 */
function FooterMenuItem({
  item,
  currentPath,
}: {
  item: MenuItem;
  currentPath: string;
}) {
  const isActive = isActiveUrl(item.url, currentPath);

  return (
    <>
      <Link
        href={item.url}
        className={`text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'text-[#ff9600]'
            : 'text-[#a0a3b1] hover:text-[#f5f5f7]'
        }`}
      >
        {item.title}
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className="mt-2 space-y-2">
          {item.children.map((child) => {
            const childIsActive = isActiveUrl(child.url, currentPath);
            return (
              <li key={child.id}>
                <Link
                  href={child.url}
                  className={`text-xs transition-colors duration-200 ${
                    childIsActive
                      ? 'text-[#ff9600]'
                      : 'text-[#6b6e7d] hover:text-[#a0a3b1]'
                  }`}
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

/**
 * フッターナビゲーション（クライアントコンポーネント）
 */
export function FooterNav({ items }: { items: MenuItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-row flex-wrap gap-6"
      aria-label="フッターナビゲーション"
    >
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <FooterMenuItem item={item} currentPath={pathname} />
        </div>
      ))}
    </nav>
  );
}

