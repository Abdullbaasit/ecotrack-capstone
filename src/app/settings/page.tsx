import type {Metadata} from 'next';
import SettingsExplorer from '@/components/features/SettingsExplorer';
export const metadata:Metadata={title:'Settings'};
export default function Page(){return <div className="space-y-7"><header><p className="text-sm font-semibold text-emerald-700">EcoTrack · Demonstration environment</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Settings</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Review application preferences for the EcoTrack prototype.</p></header><SettingsExplorer/></div>}
