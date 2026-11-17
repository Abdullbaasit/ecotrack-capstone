
'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

const tabs = [
  {
    id: 'air',
    label: 'Air Quality',
    content:
      'Monitor air quality indicators, particulate levels and pollution readings across EcoTrack monitoring stations.',
  },
  {
    id: 'water',
    label: 'Water Quality',
    content:
      'Explore water quality indices and sample readings. Laboratory testing is required before making water safety conclusions.',
  },
  {
    id: 'temperature',
    label: 'Temperature',
    content:
      'Review temperature observations recorded in the EcoTrack demonstration dataset.',
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>
  ) {
    let nextIndex = activeTab;

    if (event.key === 'ArrowRight') {
      nextIndex = (activeTab + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (activeTab - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Accessible Tabs
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Use the arrow keys to navigate between tabs.
      </p>

      <div
        role="tablist"
        aria-label="Environmental information"
        className="mt-5 flex flex-wrap gap-2 border-b border-slate-200"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={handleKeyDown}
            className={`rounded-t-lg px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
              activeTab === index
                ? 'border-b-2 border-emerald-700 text-emerald-800'
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== index}
          tabIndex={0}
          className="mt-5 rounded-lg bg-emerald-50 p-5 text-sm leading-7 text-slate-700 focus-visible:outline-2 focus-visible:outline-emerald-600"
        >
          {tab.content}
        </div>
      ))}
    </section>
  );
}
