
'use client';

import { useEffect, useRef, useState } from 'react';

export default function ModalDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    setIsOpen(false);
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Accessible Modal Dialog
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Open the dialog to view its content. You can also use
        the Escape key to close it.
      </p>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-5 rounded-lg bg-emerald-700 px-5 py-3 font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
      >
        Open Modal
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClose={handleClose}
        onCancel={handleCancel}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-slate-200 bg-white p-0 shadow-2xl backdrop:bg-slate-950/50"
      >
        <div className="p-6">
          <h3
            id="modal-title"
            className="text-xl font-bold text-slate-900"
          >
            Environmental Report
          </h3>

          <p
            id="modal-description"
            className="mt-3 text-sm leading-6 text-slate-600"
          >
            This modal demonstrates an accessible dialog
            component built using React and native HTML.
            Keyboard users can navigate its controls,
            and the browser manages focus while it is open.
          </p>

          <div className="mt-6 rounded-lg bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-900">
              Accessibility features
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-800">
              <li>Escape key closes the dialog.</li>
              <li>Keyboard focus stays within the modal.</li>
              <li>Focus returns to the opening button.</li>
              <li>Accessible title and description.</li>
              <li>Background content is made inert.</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-emerald-700 px-5 py-2.5 font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
            >
              Close Dialog
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
