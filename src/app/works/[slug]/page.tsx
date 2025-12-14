export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Works / Detail</h1>
      <p className="mt-2 text-slate-200">Works / Detail / slug: {slug}</p>
      <p className="mt-6 text-slate-300">ここに実績詳細（後で）</p>
    </main>
  );
}
