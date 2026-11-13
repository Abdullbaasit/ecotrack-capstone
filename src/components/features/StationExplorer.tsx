
'use client';

import { useMemo, useState } from 'react';

import { Search, MapPin } from 'lucide-react';

import { stations } from '@/data/environment';

import StatusBadge from '@/components/ui/StatusBadge';

import { formatTemperature } from '@/lib/utils';

import type { StationStatus } from '@/types/environment';

type StatusFilter = 'All' | StationStatus;

export default function StationExplorer() {

  const [query, setQuery] = useState('');

  const [status, setStatus] = useState<StatusFilter>('All');

  // Search and filter monitoring stations.
  const visible = useMemo(() => {

    return stations.filter((station) => {

      const matchesSearch = (
        `${station.name} ${station.id} ${station.area}`
      )
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus =
        status === 'All' || station.status === status;

      return matchesSearch && matchesStatus;

    });

  }, [query, status]);

  return (

    <div className="space-y-5">

      {/* SEARCH AND FILTER */}
      <div className="flex flex-col gap-3 sm:flex-row">

        <label className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">

          <Search
            size={18}
            className="text-slate-400"
          />

          <span className="sr-only">
            Search stations
          </span>

          <input
            className="w-full outline-none"
            placeholder="Search stations, areas or IDs"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

        </label>

        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4">

          <span className="text-sm text-slate-500">
            Status
          </span>

          <select
            aria-label="Filter by station status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as StatusFilter)
            }
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

      {/* RESULTS COUNT */}
      <p className="text-sm text-slate-500">
        {visible.length} of {stations.length} sample stations
      </p>

      {/* STATION CARDS */}
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

            {/* ENVIRONMENTAL READINGS */}
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm">

              <div>

                <dt className="text-slate-500">
                  Air index
                </dt>

                <dd className="mt-1 text-lg font-bold">
                  {station.air}
                </dd>

              </div>

              <div>

                <dt className="text-slate-500">
                  Water index
                </dt>

                <dd className="mt-1 text-lg font-bold">
                  {station.water}
                </dd>

              </div>

              <div>

                <dt className="text-slate-500">
                  Temperature
                </dt>

                <dd className="mt-1 text-lg font-bold">
                  {formatTemperature(station.temperature)}
                </dd>

              </div>

              <div>

                <dt className="text-slate-500">
                  Humidity
                </dt>

                <dd className="mt-1 text-lg font-bold">
                  {station.humidity}%
                </dd>

              </div>

            </dl>

          </article>

        ))}

      </div>

      {/* EMPTY SEARCH RESULT */}
      {visible.length === 0 && (

        <p
          role="status"
          className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500"
        >
          No stations match your search.
        </p>

      )}

    </div>

  );

}
