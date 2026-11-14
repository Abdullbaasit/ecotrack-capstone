type ErrorStateProps = {
  title?: string;
  description?: string;
  details?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

export default function ErrorState({
  title = 'Something went wrong',
  description = 'We could not retrieve the requested information. Please try again.',
  details,
  onRetry,
  retryLabel = 'Try again',
  className = '',
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-rose-200 bg-white p-8 text-center ${className}`}
    >
      <div
        aria-hidden="true"
        className="rounded-full bg-rose-50 p-4 text-rose-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          {title}
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>

        {details && (
          <p className="mt-2 text-xs text-slate-400">
            {details}
          </p>
        )}
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
