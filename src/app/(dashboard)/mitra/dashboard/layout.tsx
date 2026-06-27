import { MitraDashboardShell } from '@/components/dashboard/DashboardShell';

export default function MitraDashboardLayout({ children }: { children: React.ReactNode }) {
  return <MitraDashboardShell>{children}</MitraDashboardShell>;
}