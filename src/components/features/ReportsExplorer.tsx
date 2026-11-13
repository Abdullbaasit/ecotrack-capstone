
'use client';

import { useMemo, useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';

import { stations } from '@/data/environment';
import StatusBadge from '@/components/ui/StatusBadge';

import {
  calculateAverage,
  calculateStationAverage,
} from '@/lib/utils';

export default function ReportsExplorer() {
  const [area, setArea] = useState('All');

  // Generate unique monitoring areas.
  const areas = useMemo(
    () => ['All', ...new Set(stations.map((station) => station.area))],
    []
  );

  // Filter stations according to selected area.
  const filtered = useMemo(
    () =>
      stations.filter(
        (station) => area === 'All' || station.area === area
      ),
    [area]
  );

  // Calculate report statistics from the shared dataset.
  const averageAir = calculateStationAverage(filtered, 'air');
  const averageWater = calculateStationAverage(filtered, 'water');
  const averageTemperature = calculateAverage(
    filtered.map((station) => station.temperature)
  );

  // Safely format CSV cells.
  function csvCell(value: string | number): string {
    let text = String(value);

    // Protect spreadsheet applications against formula injection.
    if (/^[\s]*[=+\-@]/.test(text)) {
      text = `'${text}`;
    }

    return `"${text.replaceAll('"', '""')}"`;
  }

  // Export filtered environmental station data.
  function download() {
    if (filtered.length === 0) return;

    const header = [
      'Station ID',
      'Station Name',
      'Area',
      'Air Quality Index (AQI)',
      'Water Quality Index',
      'Temperature (Celsius)',
      'Humidity (%)',
      'Station Status',
    ];

    const body = filtered.map((station) => [
      station.id,
      station.name,
      station.area,
      station.air,
      station.water,
      station.temperature,
      station.humidity,
      station.status,
    ]);

    const csv = [header, ...body]
      .map((row) => row.map(csvCell).join(','))
      .join('\r\n');

    const blob = new Blob(
      ['\uFEFF', csv],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const date = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `ecotrack-demo-report-${date}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="space-y-5">

      {/* REPORT INTRODUCTION */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
            <FileSpreadsheet size={24} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Environmental Station Reports
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Generate and export environmental monitoring summaries.
            </p>
          </div>
        </div>
      </section>

      {/* AREA FILTER */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <label className="block text-sm font-semibold text-slate-700">
          Select monitoring area

          <select
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 font-normal sm:max-w-sm"
          >
            {areas.map((item) => (
              <option key={item} value={item}>
                {item === 'All' ? 'All Lagos areas' : item}
              </option>
            ))}
          </select>
        </label>

        <p className="mt-3 text-sm text-slate-500">
          Reporting scope: {area === 'All' ? 'All Lagos monitoring areas' : area}
        </p>

      </section>

      {/* REPORT SUMMARY */}
      <section
        aria-label="Environmental report statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Monitoring stations</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {filtered.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Average air index</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {averageAir.toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Illustrative AQI</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Average water index</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {averageWater.toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Illustrative index</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Average temperature</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {averageTemperature.toFixed(1)}°C
          </p>
          <p className="mt-1 text-xs text-slate-400">Illustrative readings</p>
        </div>

      </section>

      {/* STATION REPORT PREVIEW */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Station report preview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filtered.length} station records available for export.
            </p>
          </div>

          <button
            type="button"
            onClick={download}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={17} />
            Download CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">

            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="p-4">Station</th>
                <th className="p-4">Air AQI</th>
                <th className="p-4">Water</th>
                <th className="p-4">Temperature</th>
                <th className="p-4">Humidity</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((station) => (
                <tr
                  key={station.id}
                  className="border-t border-slate-100"
                >
                  <td className="p-4">
                    <p className="font-semibold text-slate-900">
                      {station.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {station.id}
                    </p>
                  </td>

                  <td className="p-4">{station.air}</td>
                  <td className="p-4">{station.water}</td>
                  <td className="p-4">{station.temperature}°C</td>
                  <td className="p-4">{station.humidity}%</td>

                  <td className="p-4">
                    <StatusBadge status={station.status} />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {filtered.length === 0 && (
          <p className="p-6 text-sm text-slate-500" role="status">
            No station records are available for this selection.
          </p>
        )}

      </section>

      {/* DATA DISCLAIMER */}
      <p className="text-xs leading-6 text-slate-500">
        EcoTrack reports currently use demonstration data. The displayed
        statistics are calculated from illustrative station readings
        and should not be interpreted as verified environmental
        measurements or regulatory assessments. CSV export is supported;
        PDF report generation is reserved for a future development phase.
      </p>

    </div>
  );
}
