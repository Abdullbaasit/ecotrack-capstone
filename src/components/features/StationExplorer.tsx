'use client';

import { useMemo, useState } from 'react';
import { Search, MapPin } from 'lucide-react';

import { stations } from '@/data/environment';
import EmptyState from '@/components/ui/EmptyState';
import StatusBadge from '@/components/ui/StatusBadge';

export default function StationExplorer() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const visible = useMemo(
    () =>
      stations.filter(
        (station) =>
          `${station.name} ${station.id} ${station.area}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (status === 'All' || station.status === status)
      ),
    [query, status]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <span className="sr-only">Search stations</span>
          <input
            className="w-full outline-none"
            placeholder="Search stations, areas or IDs"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4">
          <span className="text-sm text-slate-500">Status</span>
          <select
            aria-label="Filter by station status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="min-h-12 bg-transparent outline-none"
          >
            {['All', 'Good', 'Moderate', 'Needs attention'].map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </label>
      </div>

      <p className="text-sm text-slate-500">
        {visible.length} of {stations.length} sample stations
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="No monitoring stations found"
          description="Try another station name, area, ID or status filter."
          icon={<Search size={24} />}
          action={
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setStatus('All');
              }}
              className="rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((station) => (
            <article
              key={station.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-emerald-700">
                    {station.id}
                  </p>

                  <h2 className="mt-1 text-lg font-semibold">
                    {station.name}
                  </h2>

                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={14} />
                    {station.area}, Lagos
                  </p>
                </div>

                <StatusBadge status={station.status} />
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm">
                {[
                  ['Air index', station.air],
                  ['Water index', station.water],
                  ['Temperature', `${station.temperature}°C`],
                  ['Humidity', `${station.humidity}%`],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="mt-1 text-lg font-bold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}