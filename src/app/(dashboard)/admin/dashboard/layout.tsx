import { AdminDashboardShell } from '@/components/dashboard/AdminDashboardShell';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
