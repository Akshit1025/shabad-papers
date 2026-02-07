/**
 * @fileOverview The navigation sidebar for the admin panel.
 * Contains links to all admin sections and a logout button.
 */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutDashboard, ShoppingCart, List, FileText, LogOut, Image as ImageIcon } from 'lucide-react';

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/categories', label: 'Categories', icon: List },
    { href: '/admin/products', label: 'Products', icon: ShoppingCart },
    { href: '/admin/media', label: 'Media', icon: ImageIcon },
    { href: '/admin/forms', label: 'Forms', icon: FileText },
];

export function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/admin/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    return (
        <>
            <SidebarHeader>
                <div className="flex h-14 items-center justify-between border-b p-4">
                     <Link href="/admin/dashboard" className="flex items-center gap-2 font-headline text-xl font-bold text-primary overflow-hidden">
                        <Image src="/images/sp-logo-no-bg.png" alt="Shabad Papers Logo" width={30} height={30} />
                        <span className="whitespace-nowrap group-data-[collapsible=icon]:hidden">Admin Panel</span>
                    </Link>
                    <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href === '/admin/dashboard' 
                          ? pathname === item.href 
                          : pathname.startsWith(item.href);
                        
                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                                    <Link href={item.href}>
                                        <Icon />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </>
    );
}
