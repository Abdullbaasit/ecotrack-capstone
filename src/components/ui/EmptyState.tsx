import type { ReactNode } from 'react';

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title = 'No data available',
  description = 'There is currently nothing to display.',
  icon,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={`flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center ${className}`}
    >
      {icon && (
        <div
          aria-hidden="true"
          className="rounded-full bg-emerald-50 p-4 text-emerald-700"
        >
          {icon}
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          {title}
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
