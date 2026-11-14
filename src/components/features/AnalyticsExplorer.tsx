'use client';

import { useState } from 'react';

import EnvironmentalChart from '@/components/dashboard/EnvironmentalChart';

import { trend } from '@/data/environment';

import {
  calculateAverage,
  calculateMinimum,
  calculateMaximum,
  getMetricValues,
} from '@/lib/utils';

import type { EnvironmentalMetric } from '@/types/environment';

const metrics: {
  key: EnvironmentalMetric;
  label: string;
  unit: string;
}[] = [
  {
    key: 'air',
    label: 'Air quality index',
    unit: 'AQI',
  },
  {
    key: 'water',
    label: 'Water quality index',
    unit: 'index',
  },
  {
    key: 'temperature',
    label: 'Temperature',
    unit: '\u00B0C',
  },
];

export default function AnalyticsExplorer() {
  const [metric, setMetric] = useState<EnvironmentalMetric>('air');

  const selected = metrics.find((item) => item.key === metric)!;

  // Extract the selected indicator from the central trend dataset.
  const values = getMetricValues(trend, metric);

  // Calculate statistics using shared environmental utilities.
  const average = calculateAverage(values);
  const minimum = calculateMinimum(values);
  const maximum = calculateMaximum(values);

  return (
    <div className="space-y-5">

      {/* METRIC SELECTOR */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Chart metric"
      >

        {metrics.map((item) => (

          <button
            key={item.key}
            type="button"
            onClick={() => setMetric(item.key)}
            aria-pressed={metric === item.key}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
              metric === item.key
                ? 'bg-emerald-800 text-white'
                : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            {item.label}
          </button>

        ))}

      </div>

      {/* ANALYTICS CHART */}
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

        <EnvironmentalChart
          data={trend}
          metric={metric}
          title={`Weekly ${selected.label.toLowerCase()} trend`}
          unit={selected.unit}
          description="Illustrative readings · not live sensor measurements"
        />

        {/* STATISTICAL SUMMARY */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs text-slate-500">
              Average
            </p>

            <p className="mt-1 text-xl font-bold">
              {average.toFixed(1)} {selected.unit}
            </p>

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs text-slate-500">
              Minimum
            </p>

            <p className="mt-1 text-xl font-bold">
              {minimum} {selected.unit}
            </p>

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs text-slate-500">
              Maximum
            </p>

            <p className="mt-1 text-xl font-bold">
              {maximum} {selected.unit}
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}
