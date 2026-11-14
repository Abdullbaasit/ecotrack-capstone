
import type {
  StationStatus,
  AlertSeverity,
} from '@/types/environment';

export type StatusBadgeProps = {
  status: StationStatus | AlertSeverity;
  size?: 'sm' | 'md';
  className?: string;
};

const statusStyles: Record<
  StatusBadgeProps['status'],
  string
> = {
  Good: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Moderate: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  'Needs attention': 'bg-rose-50 text-rose-700 ring-rose-600/20',
  High: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Low: 'bg-slate-100 text-slate-700 ring-slate-600/20',
};

const sizeStyles: Record<
  NonNullable<StatusBadgeProps['size']>,
  string
> = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
};

export default function StatusBadge({
  status,
  size = 'md',
  className = '',
}: StatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-semibold',
        'ring-1 ring-inset',
        statusStyles[status],
        sizeStyles[size],
        className,
      ].filter(Boolean).join(' ')}
    >
      {status}
    </span>
  );
}
