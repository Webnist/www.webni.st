import { notFound } from 'next/navigation';
import { getWorkBySlug } from '@/lib/works';

/**
 * Works 詳細ページ
 * @param params - パラメータ
 * @returns Works 詳細ページ
 */
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1
        className="text-3xl font-bold"
        dangerouslySetInnerHTML={{ __html: work.title }}
      />

      {work.meta.client_name && (
        <p className="mt-2 text-slate-300">クライアント: {work.meta.client_name}</p>
      )}
      {work.meta.period && (
        <p className="mt-1 text-slate-300">期間: {work.meta.period}</p>
      )}
      {work.meta.role && (
        <p className="mt-1 text-slate-300">担当領域: {work.meta.role}</p>
      )}
      {work.meta.tech_stack && work.meta.tech_stack.length > 0 && (
        <p className="mt-1 text-slate-300">
          使用技術: {work.meta.tech_stack.join(', ')}
        </p>
      )}

      <article
        className="prose prose-invert mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: work.content }}
      />

      {work.meta.project_url && (
        <div className="mt-8">
          <a
            href={work.meta.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            プロジェクトURL →
          </a>
        </div>
      )}
    </main>
  );
}
