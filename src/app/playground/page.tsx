
import ModalDialog from '@/../playground/ModalDialog';
import Tabs from '@/../playground/Tabs';
import Disclosure from '@/../playground/Disclosure';

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            FE-05 ACCESSIBILITY PLAYGROUND
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Accessible Components
          </h1>

          <p className="mt-3 text-slate-600">
            Interactive demonstrations of accessible React components.
          </p>
        </div>

        <ModalDialog />

        <Tabs />
        <Disclosure />
      </div>
    </main>
  );
}
