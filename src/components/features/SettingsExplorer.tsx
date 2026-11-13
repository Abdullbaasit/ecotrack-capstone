
'use client';

import { useState, useSyncExternalStore } from 'react';
import { RotateCcw, Save, Settings2 } from 'lucide-react';

type TemperatureUnit = 'Celsius' | 'Fahrenheit';

type RefreshPreference =
  | 'Manual'
  | 'Every 5 minutes'
  | 'Every 15 minutes';

type AppPreferences = {
  temperatureUnit: TemperatureUnit;
  refreshInterval: RefreshPreference;
};

const STORAGE_KEY = 'ecotrack-preferences';

const DEFAULT_PREFERENCES: AppPreferences = {
  temperatureUnit: 'Celsius',
  refreshInterval: 'Manual',
};

const DEFAULT_SNAPSHOT = JSON.stringify(DEFAULT_PREFERENCES);

// Read saved preferences from browser storage.
function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_SNAPSHOT;
  } catch {
    return DEFAULT_SNAPSHOT;
  }
}

// Server snapshot prevents hydration mismatches.
function getServerSnapshot(): string {
  return DEFAULT_SNAPSHOT;
}

// Subscribe to preference changes across browser tabs.
function subscribe(callback: () => void) {
  const handleStorage = () => callback();

  window.addEventListener('storage', handleStorage);
  window.addEventListener('ecotrack-preferences-change', handleStorage);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(
      'ecotrack-preferences-change',
      handleStorage
    );
  };
}

// Validate and read stored preferences.
function parsePreferences(snapshot: string): AppPreferences {
  try {
    const parsed = JSON.parse(snapshot) as Partial<AppPreferences>;

    return {
      temperatureUnit:
        parsed.temperatureUnit === 'Fahrenheit'
          ? 'Fahrenheit'
          : 'Celsius',

      refreshInterval:
        parsed.refreshInterval === 'Every 5 minutes' ||
        parsed.refreshInterval === 'Every 15 minutes'
          ? parsed.refreshInterval
          : 'Manual',
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

// Persist preferences.
function savePreferences(preferences: AppPreferences) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferences)
    );

    window.dispatchEvent(
      new Event('ecotrack-preferences-change')
    );

    return true;
  } catch {
    return false;
  }
}

export default function SettingsExplorer() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const preferences = parsePreferences(snapshot);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function updatePreference(
    changes: Partial<AppPreferences>
  ) {
    const updated = {
      ...preferences,
      ...changes,
    };

    const success = savePreferences(updated);

    setSaved(success);
    setError(
      success
        ? ''
        : 'Unable to save preferences. Check your browser storage settings.'
    );
  }

  function resetPreferences() {
    const success = savePreferences(DEFAULT_PREFERENCES);

    setSaved(success);
    setError(
      success
        ? ''
        : 'Unable to reset preferences. Please check browser storage.'
    );
  }

  return (
    <div className="max-w-2xl space-y-5">

      {/* SETTINGS HEADER */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800">
            <Settings2 size={24} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Display preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure your EcoTrack application preferences.
            </p>
          </div>

        </div>

      </section>

      {/* TEMPERATURE SETTINGS */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <h3 className="font-semibold text-slate-900">
          Temperature unit
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Select your preferred temperature measurement unit.
        </p>

        <label className="mt-4 block text-sm font-medium text-slate-700">

          Display unit

          <select
            value={preferences.temperatureUnit}
            onChange={(event) => {
              updatePreference({
                temperatureUnit: event.target.value as TemperatureUnit,
              });
            }}
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3"
          >
            <option value="Celsius">Celsius (°C)</option>
            <option value="Fahrenheit">Fahrenheit (°F)</option>
          </select>

        </label>

      </section>

      {/* REFRESH SETTINGS */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <h3 className="font-semibold text-slate-900">
          Data refresh preference
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Choose your preferred environmental data refresh interval.
        </p>

        <label className="mt-4 block text-sm font-medium text-slate-700">

          Refresh interval

          <select
            value={preferences.refreshInterval}
            onChange={(event) => {
              updatePreference({
                refreshInterval: event.target.value as RefreshPreference,
              });
            }}
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3"
          >
            <option value="Manual">Manual refresh</option>
            <option value="Every 5 minutes">Every 5 minutes</option>
            <option value="Every 15 minutes">Every 15 minutes</option>
          </select>

        </label>

      </section>

      {/* PREFERENCE STATUS */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <h3 className="font-semibold text-slate-900">
          Preference summary
        </h3>

        <div className="mt-4 space-y-3 text-sm">

          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Temperature</span>
            <span className="font-semibold text-slate-900">
              {preferences.temperatureUnit}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Refresh interval</span>
            <span className="font-semibold text-slate-900">
              {preferences.refreshInterval}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Storage</span>
            <span className="font-semibold text-emerald-700">
              Browser local storage
            </span>
          </div>

        </div>

      </section>

      {/* ACTIONS */}
      <div className="flex flex-wrap items-center gap-3">

        <button
          type="button"
          onClick={() => {
            setSaved(false);
            resetPreferences();
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RotateCcw size={17} />
          Reset defaults
        </button>

        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white">
          <Save size={17} />
          Auto-save enabled
        </div>

      </div>

      {saved && (
        <p role="status" className="text-sm font-medium text-emerald-700">
          Your EcoTrack preferences have been saved successfully.
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm font-medium text-rose-700">
          {error}
        </p>
      )}

      {/* TRANSPARENCY NOTICE */}
      <p className="text-xs leading-6 text-slate-500">
        Preferences are saved locally in your browser. Temperature
        conversion across dashboard readings and automatic environmental
        data fetching will be connected in subsequent development phases.
        Refresh intervals currently represent saved user preferences,
        not active sensor polling.
      </p>

    </div>
  );
}
