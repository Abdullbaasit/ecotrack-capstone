'use client';

import { useEffect, useState } from 'react';

import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';

type Result = {
  status: string;
  application: string;
  service: string;
  version: string;
  timestamp: string;
};

export default function HealthExplorer() {
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const response = await fetch('/api/health', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result: Result = await response.json();

        if (!cancelled) {
          setData(result);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setData(null);
          setError(
            err instanceof Error
              ? err.message
              : 'Health check unavailable'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void checkHealth();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  function handleRefresh() {
    setLoading(true);
    setError('');
    setData(null);
    setRefreshKey((current) => current + 1);
  }

  if (loading) {
    return (
      <LoadingState
        title="Checking system health"
        description="Fetching the latest response from the EcoTrack health API."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Health check failed"
        description="EcoTrack could not retrieve the latest system health information."
        details={error}
        onRetry={handleRefresh}
        retryLabel="Retry health check"
      />
    );
  }

  return (
    <div className="max-w-2xl space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            Service health endpoint
          </h2>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Refresh check
          </button>
        </div>

        {data && (
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {Object.entries(data).map(([key, value]) => (
              <div
                className="rounded-xl bg-slate-50 p-4"
                key={key}
              >
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  {key}
                </dt>

                <dd className="mt-1 break-words font-semibold text-slate-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      <p className="text-sm text-slate-500">
        This fetch verifies that the EcoTrack application API
        responds; it does not verify third-party sensors,
        databases or external systems.
      </p>
    </div>
  );
}