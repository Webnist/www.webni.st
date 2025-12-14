import Link from 'next/link';

const navItems = [
  { href: '/blog', label: 'Blog' },
  { href: '/works', label: 'Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Header() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-base font-bold tracking-wide text-orange-400">
            webni.st
          </span>
          <span className="text-xs text-slate-400">by Webnist</span>
        </Link>

        <nav className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-200 hover:text-orange-300 hover:underline underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
