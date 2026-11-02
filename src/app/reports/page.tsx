import type {Metadata} from 'next';
import ReportsExplorer from '@/components/features/ReportsExplorer';
export const metadata:Metadata={title:'Environmental Reports'};
export default function Page(){return <div className="space-y-7"><header><p className="text-sm font-semibold text-emerald-700">EcoTrack · Demonstration environment</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Environmental Reports</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Export filtered environmental demonstration readings.</p></header><ReportsExplorer/></div>}
