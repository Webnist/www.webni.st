'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
    // 相対パスの場合
    return url === currentPath || currentPath.startsWith(url + '/');
  }
}

/**
 * メニューアイテムのプロップス
 */
interface HeaderNavProps {
  items: MenuItem[];
}

/**
 * デスクトップメニューアイテム
 */
function DesktopMenuItem({
  item,
  currentPath,
}: {
  item: MenuItem;
  currentPath: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = isActiveUrl(item.url, currentPath);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.url}
        className={`text-sm font-medium transition-colors duration-200 text-en relative group ${
          isActive
            ? 'text-[#ff9600]'
            : 'text-[#a0a3b1] hover:text-[#f5f5f7]'
        }`}
        aria-haspopup={hasChildren ? 'true' : undefined}
        aria-expanded={hasChildren && isOpen ? 'true' : undefined}
      >
        {item.title}
        {isActive && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff9600] rounded-full"></span>
        )}
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff9600] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
      </Link>
      {hasChildren && isOpen && (
        <ul
          className="absolute left-0 top-full mt-2 min-w-[200px] rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.95)] backdrop-blur shadow-lg py-2 z-50"
          role="menu"
          aria-label={`${item.title} サブメニュー`}
        >
          {item.children.map((child) => {
            const childIsActive = isActiveUrl(child.url, currentPath);
            return (
              <li key={child.id} role="none">
                <Link
                  href={child.url}
                  className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                    childIsActive
                      ? 'bg-[rgba(255,150,0,0.1)] text-[#ff9600]'
                      : 'text-[#f5f5f7] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#ff9600]'
                  }`}
                  role="menuitem"
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

/**
 * モバイルメニューアイテム
 */
function MobileMenuItem({
  item,
  currentPath,
  level = 0,
}: {
  item: MenuItem;
  currentPath: string;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = isActiveUrl(item.url, currentPath);

  return (
    <li>
      <div className="flex items-center justify-between">
        <Link
          href={item.url}
          className={`block flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 text-en ${
            isActive
              ? 'bg-[rgba(255,150,0,0.1)] text-[#ff9600] border-l-2 border-[#ff9600]'
              : 'text-[#a0a3b1] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#f5f5f7]'
          }`}
          onClick={() => {
            if (!hasChildren) {
              // 子メニューがない場合は、親のモバイルメニューを閉じる
              const event = new CustomEvent('closeMobileMenu');
              window.dispatchEvent(event);
            }
          }}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-3 text-[#a0a3b1] hover:text-[#ff9600] transition-colors"
            aria-expanded={isOpen}
            aria-label={`${item.title} サブメニューを${isOpen ? '閉じる' : '開く'}`}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <ul className="bg-[rgba(0,0,0,0.3)]">
          {item.children.map((child) => (
            <MobileMenuItem
              key={child.id}
              item={child}
              currentPath={currentPath}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * ヘッダーナビゲーション（クライアントコンポーネント）
 */
export function HeaderNav({ items }: HeaderNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleCloseMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('closeMobileMenu', handleCloseMobileMenu);
    return () => {
      window.removeEventListener('closeMobileMenu', handleCloseMobileMenu);
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 検索処理（実装が必要な場合は適宜追加）
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  // モバイルメニューが開いている時はbodyのスクロールを無効化
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* デスクトップナビゲーション & 検索 */}
      <div className="hidden md:flex items-center gap-6">
        {/* Navigation Links */}
        <nav aria-label="メインナビゲーション">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <DesktopMenuItem key={item.id} item={item} currentPath={pathname} />
            ))}
          </ul>
        </nav>

        {/* Desktop Search */}
        <div className="relative">
          {!isSearchOpen ? (
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#a0a3b1] hover:text-[#ff9600] transition-colors"
              aria-label="検索を開く"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          ) : (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="サイト内検索..."
                  className="w-64 px-4 py-2 pl-10 pr-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f5f7] placeholder-[#6b6e7d] text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9600] focus:ring-opacity-50 transition-all"
                  autoFocus
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6e7d]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6e7d] hover:text-[#ff9600] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-2 text-[#6b6e7d] hover:text-[#f5f5f7] transition-colors"
                aria-label="検索を閉じる"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* モバイルメニューボタン */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-[#a0a3b1] hover:text-[#f5f5f7] transition-colors"
        aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* モバイルメニューオーバーレイ */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          style={{ top: 'var(--header-height, 73px)' }}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* モバイルメニュー */}
      <div
        className={`fixed left-0 right-0 bottom-0 md:hidden z-50 bg-[rgba(0,0,0,0.95)] backdrop-blur-xl border-t border-[rgba(255,255,255,0.08)] overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: 'var(--header-height, 73px)' }}
      >
        <div className="px-6 py-6">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="サイト内検索..."
                className="w-full px-4 py-3 pl-10 pr-10 rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f5f7] placeholder-[#6b6e7d] text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9600] focus:ring-opacity-50 transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6e7d]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6e7d] hover:text-[#ff9600] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* Mobile Navigation Links */}
          <nav aria-label="モバイルナビゲーション">
            <ul className="space-y-2">
              {items.map((item, index) => {
                const isActive = isActiveUrl(item.url, pathname);
                return (
                  <li
                    key={item.id}
                    className="opacity-0 animate-fade-in"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'forwards',
                    }}
                  >
                    <Link
                      href={item.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-[12px] text-sm font-medium transition-all duration-200 text-en ${
                        isActive
                          ? 'bg-[rgba(255,150,0,0.1)] text-[#ff9600] border border-[rgba(255,150,0,0.2)]'
                          : 'text-[#a0a3b1] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#f5f5f7]'
                      }`}
                    >
                      {item.title}
                    </Link>
                    {item.children && item.children.length > 0 && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {item.children.map((child) => {
                          const childIsActive = isActiveUrl(child.url, pathname);
                          return (
                            <li key={child.id}>
                              <Link
                                href={child.url}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-4 py-2 rounded-[8px] text-xs font-medium transition-all duration-200 ${
                                  childIsActive
                                    ? 'bg-[rgba(255,150,0,0.1)] text-[#ff9600]'
                                    : 'text-[#6b6e7d] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#f5f5f7]'
                                }`}
                              >
                                {child.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
