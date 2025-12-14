import Image from "next/image";

export default function HomePage() {
  return (
	<main className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm uppercase tracking-wide text-orange-400">webni.st</p>
      <h1 className="mt-3 text-4xl font-bold md:text-5xl">Web と一緒に、生きていく。</h1>
      <p className="mt-6 max-w-2xl text-base text-slate-200">
        フロントエンド、WordPress、SaaS開発の実験場。日々のtipsと、いま進めているプロジェクトの記録をまとめていきます。
      </p>
    </main>
  );
}
