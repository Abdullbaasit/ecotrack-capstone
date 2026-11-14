
import {
  Activity,
  Droplets,
  RadioTower,
  ThermometerSun,
  Wind,
  ArrowUpRight,
} from 'lucide-react';

import Link from 'next/link';

import MetricCard from '@/components/dashboard/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';

import { stations } from '@/data/environment';

import {
  calculateStationAverage,
  formatTemperature,
} from '@/lib/utils';

export default function Home() {
  // Calculate dashboard metrics from the central dataset.
  const averageAir = Math.round(
    calculateStationAverage(stations, 'air')
  );

  const averageWater = calculateStationAverage(
    stations,
    'water'
  );

  const averageTemperature = calculateStationAverage(
    stations,
    'temperature'
  );

  const stationCount = stations.length;

  return (
    <div className="space-y-7">

      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

        <div>
          <p className="mb-1 text-sm font-medium text-emerald-700">
            Overview · Demonstration data
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Environmental Overview
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor environmental indicators and explore
            sample monitoring locations across Lagos.
          </p>
        </div>

        <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
          Sample data only
        </span>

      </div>

      {/* ENVIRONMENTAL METRICS */}
      <section
        aria-label="Environmental metrics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >

        <MetricCard
          label="Average air quality"
          value={`${averageAir} AQI`}
          detail={`Across ${stationCount} sample stations`}
          icon={Wind}
        />

        <MetricCard
          label="Water quality index"
          value={`${averageWater}/100`}
          detail="Sample index, not a safety certification"
          icon={Droplets}
          tone="sky"
        />

        <MetricCard
          label="Average temperature"
          value={formatTemperature(averageTemperature)}
          detail="Sample reading average"
          icon={ThermometerSun}
          tone="amber"
        />

        <MetricCard
          label="Monitoring stations"
          value={String(stationCount).padStart(2, '0')}
          detail="Simulated monitoring locations"
          icon={RadioTower}
        />

      </section>

      {/* DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)]">

        {/* MONITORING STATIONS TABLE */}
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between gap-3">

            <h2 className="text-lg font-semibold">
              Monitoring stations
            </h2>

            <Link
              href="/stations"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline"
            >
              View all
              <ArrowUpRight size={16} />
            </Link>

          </div>

          <div className="mt-4 overflow-x-auto">

            <table className="w-full min-w-[470px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">

                <tr>
                  <th className="p-3">Station</th>
                  <th className="p-3">AQI</th>
                  <th className="p-3">Water</th>
                  <th className="p-3">Status</th>
                </tr>

              </thead>

              <tbody>

                {stations.map((station) => (

                  <tr
                    className="border-t border-slate-100"
                    key={station.id}
                  >

                    <td className="p-3 font-medium">
                      {station.name}
                    </td>

                    <td className="p-3">
                      {station.air}
                    </td>

                    <td className="p-3">
                      {station.water}
                    </td>

                    <td className="p-3">
                      <StatusBadge status={station.status} />
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* SYSTEM SUMMARY */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-2">

            <Activity
              className="text-emerald-700"
              size={20}
            />

            <h2 className="text-lg font-semibold">
              System summary
            </h2>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            EcoTrack is a foundation-stage environmental
            dashboard. This overview uses illustrative data
            until a verified environmental data source is connected.
          </p>

          <Link
            href="/health"
            className="mt-5 inline-flex rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Open system health
            <ArrowUpRight
              size={16}
              className="ml-2"
            />
          </Link>

        </section>

      </div>

    </div>
  );
}
