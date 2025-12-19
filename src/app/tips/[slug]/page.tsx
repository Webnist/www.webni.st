import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blog';

/**
 * Tips 詳細ページ
 * @param params - パラメータ
 * @returns Tips 詳細ページ
 */
export default async function BlogTipsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main>
      <p className="text-xs text-slate-400">
        {new Date(post.date).toLocaleDateString('ja-JP')}
      </p>

      <h1
        className="mt-2 text-3xl font-bold"
        dangerouslySetInnerHTML={{ __html: post.title }}
      />

      <article
        className="prose prose-invert mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
