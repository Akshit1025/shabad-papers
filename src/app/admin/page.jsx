/**
 * @fileOverview Redirects the base /admin route to the /admin/dashboard route.
 */
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  redirect('/admin/dashboard');
}
