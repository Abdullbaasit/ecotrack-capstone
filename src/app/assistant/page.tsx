
import type { Metadata } from 'next';
import EnvironmentalAssistant from '@/components/features/EnvironmentalAssistant';

export const metadata: Metadata = {
  title: 'Environmental Assistant',
  description: 'Explore EcoTrack environmental demonstration data through a simulated streaming assistant.',
};

export default function AssistantPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm font-medium text-emerald-700">
          Environmental intelligence
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Environmental Assistant
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Ask questions about air quality, water quality,
          temperature readings and environmental monitoring
          across Lagos.
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Demonstration mode:</strong> This assistant
        uses predefined responses based on sample environmental
        records. It does not connect to a live AI model or
        environmental sensors.
      </div>

      <EnvironmentalAssistant />
    </div>
  );
}
