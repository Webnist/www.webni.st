import Link from 'next/link';

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-slate-200">記事一覧（仮）</p>

      <nav className="mt-6 flex gap-4 text-sm">
        <Link className="underline" href="/blog/tips">tips</Link>
        <Link className="underline" href="/blog/notes">notes</Link>
      </nav>
    </main>
  );
}
