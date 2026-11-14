'use client';

import { useState } from 'react';
import { BellRing } from 'lucide-react';

import { alerts, stations } from '@/data/environment';
import EmptyState from '@/components/ui/EmptyState';
import StatusBadge from '@/components/ui/StatusBadge';

export default function AlertsExplorer() {
  const [filter, setFilter] = useState('All');
  const [ack, setAck] = useState<string[]>([]);

  const items = alerts.filter(
    (alert) =>
      (filter === 'All' || alert.severity === filter) &&
      !ack.includes(alert.id)
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {['All', 'High', 'Medium', 'Low'].map((severity) => (
          <button
            key={severity}
            type="button"
            aria-pressed={severity === filter}
            onClick={() => setFilter(severity)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              filter === severity
                ? 'bg-emerald-800 text-white'
                : 'border border-slate-200 bg-white'
            }`}
          >
            {severity}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500">
        {items.length} active demo alerts · {ack.length} acknowledged
        in this session
      </p>

      {items.length === 0 ? (
        <EmptyState
          title="No active alerts"
          description={
            ack.length > 0
              ? 'There are no unacknowledged alerts matching this category.'
              : 'There are currently no alerts in this category.'
          }
          icon={<BellRing size={24} />}
          action={
            <button
              type="button"
              onClick={() => {
                setFilter('All');
                setAck([]);
              }}
              className="rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Reset alert view
            </button>
          }
        />
      ) : (
        <div className="space-y-3">
          {items.map((alert) => (
            <article
              key={alert.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <StatusBadge status={alert.severity} />

                  <h2 className="mt-3 text-lg font-semibold">
                    {alert.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-600">
                    {alert.detail}
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    {stations.find(
                      (station) => station.id === alert.stationId
                    )?.name}{' '}
                    · {alert.time}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                  onClick={() =>
                    setAck((previous) => [...previous, alert.id])
                  }
                >
                  Acknowledge
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-500">
        Acknowledgements reset when the page reloads. Alerts are
        demonstration scenarios, not live warnings.
      </p>
    </div>
  );
}