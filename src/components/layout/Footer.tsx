import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-800/80">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-100">webni.st</p>
            <p className="mt-1 text-xs text-slate-400">
              © {year} Webnist. Built with Next.js.
            </p>
          </div>

          <div className="flex gap-4 text-sm">
            <Link className="text-slate-300 hover:text-orange-300 underline-offset-4 hover:underline" href="/blog">
              Blog
            </Link>
            <Link className="text-slate-300 hover:text-orange-300 underline-offset-4 hover:underline" href="/works">
              Works
            </Link>
            <Link className="text-slate-300 hover:text-orange-300 underline-offset-4 hover:underline" href="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
