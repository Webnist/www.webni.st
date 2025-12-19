import { DUMMY_TOTAL_POSTS, USE_DUMMY_POSTS, getPostsByCategory } from '@/lib/blog';
import { getTermByContentType } from '@/lib/term';
import { ENV } from '@/lib/env';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Pagination } from '@/components/blog/Pagination';

/**
 * Tips 一覧ページ
 * @returns Tips 一覧ページ
 */
export default async function TipsIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ sort?: string; page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedSearchParams?.page ?? 1));
  const posts = await getPostsByCategory('tips', 12, currentPage);
  const term = await getTermByContentType(ENV.WP_TYPE_TIPS_ID);
  const categories = term?.categories ?? [];
  const sort = resolvedSearchParams?.sort === 'old' ? 'old' : 'new';
  const sortedPosts =
    sort === 'old'
      ? [...posts].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      : posts;
  const getCategoryLabel = (postIdList: number[]) =>
    categories.find((category) => postIdList.includes(category.id))?.name;
  const totalPages = USE_DUMMY_POSTS ? Math.ceil(DUMMY_TOTAL_POSTS / 12) : 3;

  return (
    <main>
      <div className="mb-12 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 md:p-8">
        <h1 className="text-5xl font-bold text-[#f5f5f7]">Tips</h1>
        {term?.description ? (
          <div
            className="mt-4 text-base text-[#a0a3b1] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: term.description }}
          />
        ) : (
          <p className="mt-4 text-base text-[#a0a3b1] leading-relaxed">技術メモ・ノウハウ</p>
        )}
      </div>

      <CategoryFilter categories={categories} basePath="/tips" sort={sort} />

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((p) => (
          <ArticleCard
            key={p.id}
            post={p}
            href={`/tips/${p.slug}`}
            tags={p.tags}
            categoryLabel={getCategoryLabel(p.categoryIds)}
          />
        ))}
      </div>

      <Pagination
        basePath="/tips"
        currentPage={currentPage}
        totalPages={totalPages}
        sort={sort}
      />
    </main>
  );
}
