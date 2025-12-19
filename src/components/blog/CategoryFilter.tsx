'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface CategoryFilterItem {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface CategoryFilterProps {
  categories?: CategoryFilterItem[];
  basePath: string;
  activeSlug?: string;
  sort?: 'new' | 'old';
}

const activeTagClass =
  'bg-gradient-to-b from-[#ff9600] to-[#ffab33] text-[#050609] border border-[rgba(255,150,0,0.5)] shadow-[0px_0px_16px_rgba(255,150,0,0.3)]';
const inactiveTagClass =
  'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#a0a3b1]';

/**
 * カテゴリー + 並び替えセクション
 */
export function CategoryFilter({
  categories = [],
  basePath,
  activeSlug = 'all',
  sort = 'new',
}: CategoryFilterProps) {
  const router = useRouter();
  const isAll = activeSlug === 'all';

  const buildHref = (slug?: string) => {
    const path = slug ? `${basePath}/category/${slug}` : basePath;
    if (sort === 'new') {
      return path;
    }
    const params = new URLSearchParams({ sort });
    return `${path}?${params.toString()}`;
  };

  const handleSortChange = (nextSort: 'new' | 'old') => {
    const path = isAll ? basePath : `${basePath}/category/${activeSlug}`;
    if (nextSort === 'new') {
      router.push(path);
      return;
    }
    const params = new URLSearchParams({ sort: nextSort });
    router.push(`${path}?${params.toString()}`);
  };

  return (
    <section className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(20,24,36,0.6)] p-[25px]">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[14px] leading-[20px] text-[#6b6e7d]">カテゴリー</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={buildHref()}
              className={cn(
                'inline-flex h-[30px] items-center justify-center rounded-full px-[13px] py-[7px] text-[12px] font-medium leading-[16px] transition-colors',
                isAll ? activeTagClass : inactiveTagClass
              )}
            >
              すべて
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={buildHref(category.slug)}
                className={cn(
                  'inline-flex h-[30px] items-center justify-center rounded-full px-[13px] py-[7px] text-[12px] font-medium leading-[16px] transition-colors',
                  activeSlug === category.slug ? activeTagClass : inactiveTagClass
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[192px]">
          <p className="text-[14px] leading-[20px] text-[#6b6e7d]">並び替え</p>
          <div className="relative mt-3 h-[42px] w-[160px]">
            <div
              className="flex h-full w-full items-center justify-between rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(20,24,36,0.6)] px-[17px] py-px text-[14px] text-[#f5f5f7]"
              aria-hidden="true"
            >
              <span className="text-[14px] font-medium leading-[20px]">:</span>
              <span className="text-[14px] font-medium leading-[20px]">
                {sort === 'old' ? '古い順' : '新しい順'}
              </span>
              <svg
                className="h-4 w-4 text-[#f5f5f7]"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <select
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              value={sort}
              onChange={(event) =>
                handleSortChange(event.target.value === 'old' ? 'old' : 'new')
              }
              aria-label="並び替え"
            >
              <option value="new">新しい順</option>
              <option value="old">古い順</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
