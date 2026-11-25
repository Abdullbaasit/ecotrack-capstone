
'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Search,
} from 'lucide-react';

type ToolState =
  | 'idle'
  | 'input-streaming'
  | 'input-available'
  | 'output-available'
  | 'output-error';

type StationResult = {
  stationId: string;
  name: string;
  area: string;
  readings: {
    air: number;
    water: number;
    temperature: number;
    humidity: number;
  };
  status: 'Good' | 'Moderate' | 'Needs attention';
  dataSource: string;
  disclaimer: string;
};

type ApiResponse = {
  success: boolean;
  data?: StationResult;
  error?: string;
};

const stateLabels: Record<ToolState, string> = {
  idle: 'Ready',
  'input-streaming': 'Preparing tool input',
  'input-available': 'Input available — executing tool',
  'output-available': 'Output available',
  'output-error': 'Output error',
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function StationAnalysisPanel() {
  const [stationId, setStationId] = useState('ST-002');
  const [state, setState] = useState<ToolState>('idle');
  const [result, setResult] = useState<StationResult | null>(null);
  const [error, setError] = useState('');

  const isRunning =
    state === 'input-streaming' ||
    state === 'input-available';

  async function analyseStation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isRunning) return;

    setResult(null);
    setError('');
    setState('input-streaming');

    try {
      // Brief display delay to make the lifecycle visible.
      // This is a UI demonstration, not AI-generated input.
      await delay(300);

      const input = { stationId: stationId.trim() };

      setState('input-available');

      // Show the execution state before the result arrives.
      await delay(300);

      const response = await fetch('/api/station-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const payload: ApiResponse = await response.json();

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(
          payload.error || 'Station analysis failed.'
        );
      }

      setResult(payload.data);
      setState('output-available');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'An unexpected error occurred.'
      );

      setState('output-error');
    }
  }

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-900">
          Environmental Station Analysis
        </h3>

        <p className="mt-1 text-xs text-slate-600">
          FE-07 structured server-side tool demonstration
        </p>
      </div>

      <form
        onSubmit={analyseStation}
        className="flex flex-wrap items-end gap-2"
      >
        <label className="flex-1 text-sm font-medium text-slate-700">
          Station ID

          <input
            value={stationId}
            onChange={event => setStationId(event.target.value)}
            disabled={isRunning}
            placeholder="Example: ST-002"
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </label>

        <button
          type="submit"
          disabled={isRunning || !stationId.trim()}
          className="flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRunning ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Search size={16} />
          )}

          Analyse
        </button>
      </form>

      <div
        role="status"
        aria-live="polite"
        className="mt-3 flex items-center gap-2 text-sm text-slate-700"
      >
        {isRunning && (
          <Loader2
            size={16}
            className="animate-spin text-emerald-700"
          />
        )}

        {state === 'output-available' && (
          <CheckCircle2 size={16} className="text-emerald-700" />
        )}

        {state === 'output-error' && (
          <AlertCircle size={16} className="text-red-600" />
        )}

        <span>
          Tool state: <strong>{stateLabels[state]}</strong>
        </span>
      </div>

      {state === 'input-available' && (
        <p className="mt-2 text-xs text-slate-500">
          Validating input and retrieving station readings...
        </p>
      )}

      {state === 'output-error' && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          <p className="font-semibold">Analysis failed</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2">
            Check the station ID and try again.
          </p>
        </div>
      )}

      {state === 'output-available' && result && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="font-semibold text-slate-900">
                {result.name}
              </h4>

              <p className="text-xs text-slate-500">
                {result.area} · {result.stationId}
              </p>
            </div>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
              {result.status}
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">
                Air quality index
              </dt>
              <dd className="text-xl font-semibold text-slate-900">
                {result.readings.air}
              </dd>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">
                Water quality index
              </dt>
              <dd className="text-xl font-semibold text-slate-900">
                {result.readings.water}
              </dd>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">
                Temperature
              </dt>
              <dd className="text-xl font-semibold text-slate-900">
                {result.readings.temperature}°C
              </dd>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">
                Humidity
              </dt>
              <dd className="text-xl font-semibold text-slate-900">
                {result.readings.humidity}%
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-xs text-slate-600">
            <strong>Source:</strong> {result.dataSource}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {result.disclaimer}
          </p>
        </div>
      )}
    </section>
  );
}
