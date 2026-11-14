
import type { LucideIcon } from 'lucide-react';

export type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: 'emerald' | 'sky' | 'amber';
};

const toneStyles: Record<
  NonNullable<MetricCardProps['tone']>,
  string
> = {
  emerald: 'bg-emerald-50 text-emerald-700',
  sky: 'bg-sky-50 text-sky-700',
  amber: 'bg-amber-50 text-amber-700',
};

export default function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'emerald',
}: MetricCardProps) {
  return (
    <article
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <span
          aria-hidden="true"
          className={`shrink-0 rounded-xl p-2.5 ${toneStyles[tone]}`}
        >
          <Icon size={20} />
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {detail}
      </p>
    </article>
  );
}
