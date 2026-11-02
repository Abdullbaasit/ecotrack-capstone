'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { navigation } from '@/data/stations';

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)} className="fixed left-4 top-4 z-30 rounded-xl border border-emerald-200 bg-white p-2 text-emerald-950 shadow-sm lg:hidden">
        <Menu size={22} />
      </button>
      {open && <button type="button" aria-label="Close navigation overlay" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-emerald-950 text-white transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-7">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 text-xl font-bold tracking-tight">
            <span className="rounded-xl bg-emerald-400/20 p-2 text-emerald-300"><Leaf size={25} /></span> EcoTrack
          </Link>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation" className="rounded-lg p-2 hover:bg-white/10 lg:hidden"><X size={20}/></button>
        </div>
        <div className="px-5 pb-2 pt-7 text-xs font-semibold uppercase tracking-[.2em] text-emerald-200/60">Workspace</div>
        <nav aria-label="Primary navigation" className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');
            return <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${active ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/25' : 'text-emerald-50/75 hover:bg-white/10 hover:text-white'}`}><Icon size={19}/>{label}</Link>;
          })}
        </nav>
        <div className="border-t border-white/10 px-6 py-5 text-xs text-emerald-200/70">Environmental intelligence · Demo</div>
      </aside>
    </>
  );
}
