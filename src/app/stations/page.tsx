import type {Metadata} from 'next';
import StationExplorer from '@/components/features/StationExplorer';
export const metadata:Metadata={title:'Monitoring Stations'};
export default function Page(){return <div className="space-y-7"><header><p className="text-sm font-semibold text-emerald-700">EcoTrack · Demonstration environment</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Monitoring Stations</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Search and inspect illustrative Lagos environmental monitoring stations.</p></header><StationExplorer/></div>}
