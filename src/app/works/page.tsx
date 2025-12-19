import Link from 'next/link'; // Next.js の Link コンポーネント
import { getAllWorks } from '@/lib/works'; // 実績一覧を取得する関数

/**
 * Works 一覧ページ
 * @returns Works 一覧ページ
 */

export default async function WorksIndexPage() {
  const works = await getAllWorks(12, 1);

  return (
    <main>
      <h1 className="text-3xl font-bold">Works</h1>
      <p className="mt-2 text-slate-200">WordPress から取得</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {works.map((w) => (
          <article key={w.id} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <Link href={`/works/${w.slug}`} className="block">
              <h2
                className="text-lg font-semibold hover:underline underline-offset-4"
                dangerouslySetInnerHTML={{ __html: w.title }}
              />
              <p
                className="mt-2 text-sm text-slate-300"
                dangerouslySetInnerHTML={{ __html: w.excerpt }}
              />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
