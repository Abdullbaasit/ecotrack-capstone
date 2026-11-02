import type {Metadata} from 'next';
import HealthExplorer from '@/components/features/HealthExplorer';
export const metadata:Metadata={title:'System Health'};
export default function Page(){return <div className="space-y-7"><header><p className="text-sm font-semibold text-emerald-700">EcoTrack · Demonstration environment</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">System Health</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Inspect live responses from the application health API.</p></header><HealthExplorer/></div>}
