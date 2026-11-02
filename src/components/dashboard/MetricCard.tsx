import type { LucideIcon } from 'lucide-react';

type Props = { label: string; value: string; detail: string; icon: LucideIcon; tone?: 'green'|'blue'|'amber' };
export default function MetricCard({label,value,detail,icon:Icon,tone='green'}:Props) {
  const tones = {green:'bg-emerald-50 text-emerald-700',blue:'bg-sky-50 text-sky-700',amber:'bg-amber-50 text-amber-700'};
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><span className={`rounded-xl p-2.5 ${tones[tone]}`}><Icon size={20}/></span></div><p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-2 text-xs text-slate-500">{detail}</p></article>;
}
