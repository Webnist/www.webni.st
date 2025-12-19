import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  sort?: 'new' | 'old';
  categorySlug?: string;
}

function buildPageHref(
  basePath: string,
  page: number,
  sort?: 'new' | 'old',
  categorySlug?: string
) {
  const path = categorySlug ? `${basePath}/category/${categorySlug}` : basePath;
  const params = new URLSearchParams();

  if (page > 1) {
    params.set('page', String(page));
  }
  if (sort && sort !== 'new') {
    params.set('sort', sort);
  }

  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

function getPageItems(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: Array<number | 'ellipsis'> = [];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  items.push(1);
  if (start > 2) items.push('ellipsis');
  for (let i = start; i <= end; i += 1) {
    items.push(i);
  }
  if (end < total - 1) items.push('ellipsis');
  items.push(total);

  return items;
}

/**
 * ページネーション
 */
export function Pagination({
  basePath,
  currentPage,
  totalPages,
  sort,
  categorySlug,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const items = getPageItems(currentPage, totalPages);
  const buttonClass =
    'flex h-[40px] w-[40px] items-center justify-center rounded-[10px] text-[16px] font-normal';

  return (
    <div className="mt-12 flex justify-center">
      <nav
        className="inline-flex items-center justify-center gap-[8px] rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(20,24,36,0.6)] p-[9px]"
        aria-label="Pagination"
      >
        {currentPage === 1 ? (
          <span className={cn(buttonClass, 'text-[#6b6e7d]')}>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <Link
            href={buildPageHref(basePath, prevPage, sort, categorySlug)}
            className={cn(buttonClass, 'text-[#a0a3b1] hover:bg-white/5')}
            aria-label="前のページ"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}

        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className={cn(buttonClass, 'text-[#6b6e7d]')}
            >
              ...
            </span>
          ) : (
            <Link
              key={item}
              href={buildPageHref(basePath, item, sort, categorySlug)}
              aria-current={item === currentPage ? 'page' : undefined}
              className={cn(
                buttonClass,
                item === currentPage
                  ? 'bg-gradient-to-b from-[#ff9600] to-[#ffab33] text-[#050609]'
                  : 'text-[#a0a3b1] hover:bg-white/5'
              )}
            >
              {item}
            </Link>
          )
        )}

        {currentPage === totalPages ? (
          <span className={cn(buttonClass, 'text-[#6b6e7d]')}>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <Link
            href={buildPageHref(basePath, nextPage, sort, categorySlug)}
            className={cn(buttonClass, 'text-[#a0a3b1] hover:bg-white/5')}
            aria-label="次のページ"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  );
}
