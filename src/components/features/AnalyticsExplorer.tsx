
'use client';

import { useState } from 'react';

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

  // Provide a safe chart range, including when values are identical.
  const rawMin = minimum;
  const rawMax = maximum;

  const padding = Math.max((rawMax - rawMin) * 0.1, 1);

  const min = Math.max(0, rawMin - padding);
  const max = rawMax + padding;

  const range = max - min || 1;

  // Generate SVG chart coordinates.
  const points = values
    .map((value, index) => {
      const x = 45 + index * 84;
      const y = 215 - ((value - min) / range) * 150;

      return `${x},${y}`;
    })
    .join(' ');

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

        <h2 className="text-lg font-semibold">
          Weekly {selected.label.toLowerCase()} trend
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Illustrative readings · not live sensor measurements
        </p>

        {/* SVG LINE CHART */}
        <div className="mt-5 overflow-x-auto">

          <svg
            role="img"
            aria-label={`Line graph of weekly ${selected.label.toLowerCase()}`}
            viewBox="0 0 600 260"
            className="min-w-[520px] w-full"
          >

            <line
              x1="35"
              y1="215"
              x2="560"
              y2="215"
              stroke="#cbd5e1"
            />

            <line
              x1="35"
              y1="65"
              x2="560"
              y2="65"
              stroke="#e2e8f0"
              strokeDasharray="5 5"
            />

            <text
              x="5"
              y="68"
              fontSize="11"
              fill="#64748b"
            >
              {max.toFixed(1)}
            </text>

            <text
              x="5"
              y="218"
              fontSize="11"
              fill="#64748b"
            >
              {min.toFixed(1)}
            </text>

            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />

            {values.map((value, index) => {

              const x = 45 + index * 84;

              const y =
                215 - ((value - min) / range) * 150;

              return (
                <g key={trend[index].day}>

                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#047857"
                  >
                    <title>
                      {`${trend[index].day}: ${value} ${selected.unit}`}
                    </title>
                  </circle>

                  <text
                    x={x}
                    y="244"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#475569"
                  >
                    {trend[index].day}
                  </text>

                </g>
              );

            })}

          </svg>

        </div>

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
