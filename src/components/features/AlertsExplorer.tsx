
'use client';

import { useMemo, useState } from 'react';
import { BellRing } from 'lucide-react';

import { alerts, stations } from '@/data/environment';
import EmptyState from '@/components/ui/EmptyState';
import StatusBadge from '@/components/ui/StatusBadge';

import type { AlertSeverity } from '@/types/environment';

type AlertView = 'Active' | 'Acknowledged';
type SeverityFilter = 'All' | AlertSeverity;

const severityFilters: SeverityFilter[] = [
  'All',
  'High',
  'Medium',
  'Low',
];

export default function AlertsExplorer() {
  const [filter, setFilter] = useState<SeverityFilter>('All');
  const [view, setView] = useState<AlertView>('Active');
  const [acknowledged, setAcknowledged] = useState<string[]>([]);

  const activeAlerts = useMemo(
    () =>
      alerts.filter(
        (alert) => !acknowledged.includes(alert.id)
      ),
    [acknowledged]
  );

  const acknowledgedAlerts = useMemo(
    () =>
      alerts.filter(
        (alert) => acknowledged.includes(alert.id)
      ),
    [acknowledged]
  );

  const currentAlerts =
    view === 'Active' ? activeAlerts : acknowledgedAlerts;

  const visibleAlerts = currentAlerts.filter(
    (alert) =>
      filter === 'All' || alert.severity === filter
  );

  function acknowledgeAlert(id: string) {
    setAcknowledged((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  }

  function restoreAlert(id: string) {
    setAcknowledged((previous) =>
      previous.filter((alertId) => alertId !== id)
    );
  }

  function resetFilters() {
    setFilter('All');
  }

  return (
    <div className="space-y-5">

      {/* ALERT SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active alerts
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {activeAlerts.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Acknowledged alerts
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {acknowledgedAlerts.length}
          </p>
        </div>
      </section>

      {/* ALERT VIEW SELECTOR */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Alert view"
      >
        {(['Active', 'Acknowledged'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setView(item)}
            aria-pressed={view === item}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
              view === item
                ? 'bg-emerald-800 text-white'
                : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            {item} (
            {item === 'Active'
              ? activeAlerts.length
              : acknowledgedAlerts.length}
            )
          </button>
        ))}
      </div>

      {/* SEVERITY FILTER */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter alerts by severity"
      >
        {severityFilters.map((severity) => (
          <button
            key={severity}
            type="button"
            aria-pressed={filter === severity}
            onClick={() => setFilter(severity)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              filter === severity
                ? 'bg-emerald-800 text-white'
                : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            {severity}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500">
        Showing {visibleAlerts.length} {view.toLowerCase()} demonstration alerts.
      </p>

      {/* ALERT LIST */}
      {visibleAlerts.length > 0 ? (
        <div className="space-y-3">
          {visibleAlerts.map((alert) => {
            const station = stations.find(
              (item) => item.id === alert.stationId
            );

            return (
              <article
                key={alert.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={alert.severity} />
                      <span className="text-xs text-slate-400">
                        {alert.id}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-semibold text-slate-900">
                      {alert.title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {alert.detail}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span>
                        Station: {station?.name ?? 'Unknown station'}
                      </span>
                      <span>{alert.time}</span>
                    </div>
                  </div>

                  {view === 'Active' ? (
                    <button
                      type="button"
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="shrink-0 rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                    >
                      Acknowledge
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => restoreAlert(alert.id)}
                      className="shrink-0 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Restore alert
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={
            view === 'Active'
              ? 'No active alerts'
              : 'No acknowledged alerts'
          }
          description={
            filter !== 'All'
              ? 'No alerts match the selected severity. Reset the filter to see all alerts.'
              : view === 'Active'
                ? 'All demonstration alerts have been acknowledged.'
                : 'No alerts have been acknowledged yet.'
          }
          icon={<BellRing size={24} />}
          action={
            <div className="flex flex-wrap justify-center gap-2">
              {filter !== 'All' && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Clear severity filter
                </button>
              )}

              <button
                type="button"
                onClick={() => setView(view === 'Active' ? 'Acknowledged' : 'Active')}
                className="rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                View {view === 'Active' ? 'acknowledged' : 'active'} alerts
              </button>
            </div>
          }
        />
      )}

      {/* DEMONSTRATION DATA DISCLAIMER */}
      <p className="text-xs leading-5 text-slate-500">
        Alerts are demonstration scenarios, not live environmental
        warnings. Acknowledgements are maintained for the current
        browser session and reset when the page reloads.
      </p>

    </div>
  );
}
