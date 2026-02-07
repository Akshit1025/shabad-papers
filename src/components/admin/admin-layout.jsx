'use client';
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar";
import React from 'react';

export default function AdminLayout({ children }) {
  const [open, setOpen] = React.useState(true); // default state

  React.useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('sidebar_state='));
    if (cookie) {
      setOpen(cookie.split('=')[1] === 'true');
    }
  }, []);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar collapsible="icon">
        <AdminSidebar />
      </Sidebar>
      <SidebarInset className="bg-muted/40 h-screen overflow-y-auto p-6 sm:p-8">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
