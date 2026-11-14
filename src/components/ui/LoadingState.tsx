type LoadingStateProps = {
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const spinnerSizes = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
};

export default function LoadingState({
  title = 'Loading...',
  description = 'Please wait while we retrieve your data.',
  size = 'md',
  className = '',
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center ${className}`}
    >
      <span
        aria-hidden="true"
        className={`animate-spin rounded-full border-emerald-700 border-t-transparent ${spinnerSizes[size]}`}
      />

      <div>
        <p className="font-semibold text-slate-800">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
    </div>
  );
}
