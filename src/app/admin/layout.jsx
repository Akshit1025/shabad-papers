/**
 * @fileOverview A protected layout for the admin section.
 * It checks for user authentication and redirects to the login page if the user is not authenticated.
 */
'use client';

import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import AdminLayout from '@/components/admin/admin-layout';

export default function ProtectedAdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading, and there's no user OR the user is anonymous, redirect to login
    if (!loading && (!user || user.isAnonymous) && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    // If user is logged in (not anonymous) and they are on the login page, redirect to dashboard
    if (!loading && user && !user.isAnonymous && pathname === '/admin/login') {
      router.push('/admin/dashboard');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // If on login page, just render children without the admin layout shell
  if (pathname === '/admin/login') {
      return <>{children}</>;
  }

  // If user is authenticated and not anonymous, render the full admin layout
  if (user && !user.isAnonymous) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  
  // This is a fallback for the brief period during redirect or for unhandled cases
  return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
}
