import Link from 'next/link';
import { getPostsByCategory, getAllPosts } from '@/lib/blog';
import { getAllWorks } from '@/lib/works';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Card } from '@/components/ui/Card';
import type { Work } from '@/types/works';

/**
 * TOP ページ
 * @returns TOP ページ
 */
export default async function HomePage() {
  const tipsPosts = await getPostsByCategory('tips', 3, 1);
  const blogPosts = await getAllPosts(3, 1);
  const works = await getAllWorks(3, 1);

  const renderWorkCard = (work: Work) => (
    <Card
      key={work.id}
      variant="default"
      className="relative overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(128deg,rgba(15,18,28,0.85)_0%,rgba(10,12,18,0.75)_100%)] p-0 shadow-[0px_8px_32px_rgba(0,0,0,0.4),0px_2px_8px_rgba(0,0,0,0.2)]"
    >
      <Link href={`/works/${work.slug}`} className="block h-full">
        <div className="relative h-[222px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d14] to-[#050609]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,150,0,0.12),transparent_45%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,6,9,0.8)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0)]" />
          <span className="absolute left-[16px] top-[19px] inline-flex h-[26px] items-center rounded-full border border-[rgba(255,150,0,0.2)] bg-[rgba(255,255,255,0.05)] px-[13px] py-[5px] text-[12px] font-medium leading-[16px] text-[#ff9600]">
            works
          </span>
        </div>

        <div className="px-[24px] pb-[24px] pt-[16px]">
          <h3
            className="line-clamp-2 text-[20px] font-bold leading-[28px] text-[#f5f5f7]"
            dangerouslySetInnerHTML={{ __html: work.title }}
          />
          <div
            className="mt-[12px] line-clamp-2 text-[14px] leading-[22.75px] text-[#a0a3b1]"
            dangerouslySetInnerHTML={{ __html: work.excerpt }}
          />
          <div className="mt-[12px]">
            <div className="flex flex-wrap gap-2">
              {(work.meta.tech_stack ?? []).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex h-[26px] items-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-[13px] py-[5px] text-[12px] font-medium leading-[16px] text-[#a0a3b1]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.05)]" />
      </Link>
    </Card>
  );

  return (
    <main className="flex flex-col gap-24">
      <section className="rounded-[32px] border border-[rgba(255,255,255,0.12)] bg-[rgba(30,34,48,0.8)] px-[32px] py-[48px] md:px-[65px] md:py-[65px]">
        <div className="max-w-[900px]">
          <span className="inline-flex h-[30px] items-center justify-center rounded-full border border-[rgba(255,150,0,0.2)] bg-[rgba(255,150,0,0.08)] px-[13px] py-[7px] text-[12px] font-medium text-[#ff9600]">
            Web Engineer
          </span>
          <h1 className="mt-6 text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-[#f5f5f7] md:text-[48px] md:leading-[57.6px]">
            Webをいじって、生きていく。
          </h1>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#a0a3b1] md:text-[20px] md:leading-[32.5px]">
            Webnist は、フロントエンドやWordPress、ヘッドレスCMSなどの技術メモと、制作実績、日常の気づきをまとめた個人サイトです。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/works"
              className="inline-flex h-[61px] items-center justify-center rounded-full bg-gradient-to-b from-[#ff9600] to-[#ffab33] px-[32px] text-[16px] font-medium text-[#050609]"
            >
              実績を見る
            </Link>
            <Link
              href="/about"
              className="inline-flex h-[61px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] px-[32px] text-[16px] font-medium text-[#f5f5f7]"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-[#f5f5f7] md:text-[36px]">Latest Tips</h2>
            <p className="mt-2 text-[14px] text-[#a0a3b1] md:text-[16px]">
              最新の技術記事とナレッジ
            </p>
          </div>
          <Link
            href="/tips"
            className="inline-flex h-[48px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] px-[24px] text-[16px] font-medium text-[#f5f5f7]"
          >
            すべて見る
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tipsPosts.map((post) => (
            <ArticleCard
              key={post.id}
              post={post}
              href={`/tips/${post.slug}`}
              tags={post.tags}
              categoryLabel="tips"
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-[#f5f5f7] md:text-[36px]">
              Featured Works
            </h2>
            <p className="mt-2 text-[14px] text-[#a0a3b1] md:text-[16px]">
              厳選プロジェクトを紹介
            </p>
          </div>
          <Link
            href="/works"
            className="inline-flex h-[48px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] px-[24px] text-[16px] font-medium text-[#f5f5f7]"
          >
            すべて見る
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {works.map(renderWorkCard)}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-[#f5f5f7] md:text-[36px]">Latest Blog</h2>
            <p className="mt-2 text-[14px] text-[#a0a3b1] md:text-[16px]">日々の記録と気づき</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex h-[48px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] px-[24px] text-[16px] font-medium text-[#f5f5f7]"
          >
            すべて見る
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <ArticleCard
              key={post.id}
              post={post}
              href={`/blog/${post.slug}`}
              tags={post.tags}
              categoryLabel="blog"
            />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[rgba(255,255,255,0.12)] bg-[rgba(30,34,48,0.8)] px-[32px] py-[48px] text-center md:px-[65px] md:py-[65px]">
        <h2 className="text-[28px] font-bold leading-[46.8px] text-[#f5f5f7] md:text-[36px]">
          About Webnist
        </h2>
        <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[29.25px] text-[#a0a3b1] md:text-[18px]">
          Web エンジニア / テックリードとして、WordPress と Next.js を軸に 100+ のサイト運用・構築に携わってきました。
          NeutrPlatform や NeutrA11y など、Web の品質向上を目指すプロダクトの開発にも取り組んでいます。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/about"
            className="inline-flex h-[61px] items-center justify-center rounded-full bg-gradient-to-b from-[#ff9600] to-[#ffab33] px-[32px] text-[16px] font-medium text-[#050609]"
          >
            プロフィールを見る
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-[61px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] px-[32px] text-[16px] font-medium text-[#f5f5f7]"
          >
            問い合わせる
          </Link>
        </div>
      </section>
    </main>
  );
}
