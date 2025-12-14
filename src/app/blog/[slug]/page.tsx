export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Blog Post</h1>
      <p className="mt-2 text-slate-200">slug: {slug}</p>
      <p className="mt-6 text-slate-300">ここに記事本文（後で）</p>
    </main>
  );
}
