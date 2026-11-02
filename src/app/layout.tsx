import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'EcoTrack | Environmental Monitoring', template: '%s | EcoTrack' },
  description: 'EcoTrack environmental monitoring capstone dashboard (demonstration data).',
};

export default function RootLayout({children}:{children:ReactNode}) {
  return <html lang="en"><body className="bg-slate-50 text-slate-900 antialiased"><div className="min-h-screen lg:flex"><Sidebar/><div className="min-w-0 flex-1"><Header/><main id="main-content" className="mx-auto max-w-7xl p-4 sm:p-8">{children}</main></div></div></body></html>;
}
