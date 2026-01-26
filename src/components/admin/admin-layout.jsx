/**
 * @fileOverview The main UI layout for the authenticated admin panel.
 * It combines the sidebar with the main content area.
 */
import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="fixed inset-0 flex bg-muted/40">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
