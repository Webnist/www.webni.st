import Link from 'next/link';

export default function TipsIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Tips</h1>
      <p className="mt-2 text-slate-200">Tips カテゴリ一覧（仮）</p>

      <nav className="mt-6 flex gap-4 text-sm">
        <Link className="underline" href="/tips/tips">tips</Link>
        <Link className="underline" href="/tips/notes">notes</Link>
      </nav>
    </main>
  );
}
