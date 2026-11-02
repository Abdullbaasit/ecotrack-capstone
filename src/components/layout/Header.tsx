'use client';

import { usePathname } from 'next/navigation';
import { Bell, CircleUserRound } from 'lucide-react';
import { navigation } from '@/data/stations';

export default function Header() {
  const pathname = usePathname();
  const page = navigation.find(({href}) => href === pathname)?.label ?? 'EcoTrack';
  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 pl-16 sm:px-8 sm:pl-16 lg:pl-8">
      <div className="min-w-0"><p className="text-xs font-medium uppercase tracking-widest text-emerald-700">Environmental monitoring</p><h2 className="truncate text-xl font-semibold text-slate-900">{page}</h2></div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 sm:inline">Demo environment</span>
        <span aria-label="Notifications indicator" className="rounded-full border border-slate-200 p-2 text-slate-600"><Bell size={18}/></span>
        <span aria-label="User profile" className="rounded-full bg-emerald-100 p-2 text-emerald-900"><CircleUserRound size={20}/></span>
      </div>
    </header>
  );
}
