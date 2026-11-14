import { useId } from 'react';

import type {
  EnvironmentalMetric,
  TrendPoint,
} from '@/types/environment';

type EnvironmentalChartProps = {
  data: TrendPoint[];
  metric: EnvironmentalMetric;
  title: string;
  unit: string;
  description?: string;
};

const CHART = {
  left: 45,
  right: 560,
  top: 65,
  bottom: 215,
  width: 600,
  height: 260,
};

function getMetricValue(
  point: TrendPoint,
  metric: EnvironmentalMetric,
): number {
  return metric === 'temperature' ? point.temp : point[metric];
}

export default function EnvironmentalChart({
  data,
  metric,
  title,
  unit,
  description,
}: EnvironmentalChartProps) {
  const chartId = useId();

  // Ignore invalid numeric values while preserving their day labels.
  const plottedData = data
    .map((point) => ({
      day: point.day,
      value: getMetricValue(point, metric),
    }))
    .filter((point) => Number.isFinite(point.value));

  if (plottedData.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}

        <p
          role="status"
          className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600"
        >
          No readings are available to display for this metric.
        </p>
      </div>
    );
  }

  const values = plottedData.map((point) => point.value);
  const rawMinimum = Math.min(...values);
  const rawMaximum = Math.max(...values);

  // A minimum one-unit padding prevents a zero-height scale for constant data.
  const padding = Math.max((rawMaximum - rawMinimum) * 0.1, 1);
  const minimum = rawMinimum - padding;
  const maximum = rawMaximum + padding;
  const range = maximum - minimum;

  const coordinates = plottedData.map((point, index) => {
    const x =
      plottedData.length === 1
        ? (CHART.left + CHART.right) / 2
        : CHART.left +
          (index / (plottedData.length - 1)) *
            (CHART.right - CHART.left);

    const y =
      CHART.bottom -
      ((point.value - minimum) / range) *
        (CHART.bottom - CHART.top);

    return { ...point, x, y };
  });

  const linePoints = coordinates
    .map((point) => `${point.x},${point.y}`)
    .join(' ');

  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>

      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}

      <div className="mt-5 overflow-x-auto">
        <svg
          role="img"
          aria-labelledby={`${chartId}-title ${chartId}-description`}
          viewBox={`0 0 ${CHART.width} ${CHART.height}`}
          className="h-auto min-w-[520px] w-full"
        >
          <title id={`${chartId}-title`}>{title}</title>
          <desc id={`${chartId}-description`}>
            Line chart showing {coordinates.length} readings in {unit}.
            The displayed values are provided as demonstration data.
          </desc>

          <line
            x1="35"
            y1={CHART.bottom}
            x2={CHART.right}
            y2={CHART.bottom}
            stroke="#cbd5e1"
          />

          <line
            x1="35"
            y1={CHART.top}
            x2={CHART.right}
            y2={CHART.top}
            stroke="#e2e8f0"
            strokeDasharray="5 5"
          />

          <text
            x="5"
            y={CHART.top + 3}
            fontSize="11"
            fill="#64748b"
          >
            {maximum.toFixed(1)}
          </text>

          <text
            x="5"
            y={CHART.bottom + 3}
            fontSize="11"
            fill="#64748b"
          >
            {minimum.toFixed(1)}
          </text>

          <polyline
            fill="none"
            stroke="#059669"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={linePoints}
          />

          {coordinates.map((point, index) => (
            <g key={`${point.day}-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#047857"
              >
                <title>
                  {`${point.day}: ${point.value} ${unit}`}
                </title>
              </circle>

              <text
                x={point.x}
                y="244"
                textAnchor="middle"
                fontSize="12"
                fill="#475569"
              >
                {point.day}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
