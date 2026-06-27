import { CustomerDashboardShell } from '@/components/dashboard/DashboardShell';

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return <CustomerDashboardShell>{children}</CustomerDashboardShell>;
}