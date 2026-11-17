
'use client';

import { useState } from 'react';

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-900">
        Accessible Disclosure
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Click the button below to expand or collapse additional environmental information.
      </p>

      <div className="mt-5">

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="environmental-disclosure-content"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-left font-semibold text-slate-800 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <span>Environmental Monitoring Information</span>

          <span
            aria-hidden="true"
            className="text-xl text-emerald-700"
          >
            {isOpen ? '−' : '+'}
          </span>
        </button>

        <div
          id="environmental-disclosure-content"
          hidden={!isOpen}
          role="region"
          aria-labelledby="environmental-disclosure-heading"
          className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 p-5"
        >
          <h3
            id="environmental-disclosure-heading"
            className="font-bold text-emerald-900"
          >
            Understanding Environmental Monitoring
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            Environmental monitoring involves collecting and
            analysing information about environmental conditions
            to identify changes and potential risks.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            EcoTrack provides demonstration information about
            air quality, water quality, temperature and
            environmental alerts across monitoring stations.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            These readings are illustrative sample data and
            should not be treated as live environmental
            measurements.
          </p>
        </div>

      </div>
    </section>
  );
}
