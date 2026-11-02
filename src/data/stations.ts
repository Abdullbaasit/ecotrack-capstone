import { LayoutDashboard, RadioTower, ChartNoAxesCombined, BellRing, FileBarChart2, Settings2, HeartPulse } from 'lucide-react';
export const navigation = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/stations', label: 'Monitoring Stations', icon: RadioTower },
  { href: '/analytics', label: 'Analytics', icon: ChartNoAxesCombined },
  { href: '/alerts', label: 'Alerts', icon: BellRing },
  { href: '/reports', label: 'Reports', icon: FileBarChart2 },
  { href: '/settings', label: 'Settings', icon: Settings2 },
  { href: '/health', label: 'System Health', icon: HeartPulse },
];
