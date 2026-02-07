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
  useSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { LayoutDashboard, ShoppingCart, List, FileText, LogOut, Image as ImageIcon, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

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
    const { open } = useSidebar();

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
                <div className="flex h-20 items-center border-b border-border/20 relative group-data-[state=expanded]:px-4 group-data-[state=collapsed]:px-2">
                     <Link href="/admin/dashboard" className="flex items-center gap-2 font-headline text-xl font-bold text-primary overflow-hidden w-full group-data-[state=expanded]:justify-start group-data-[state=collapsed]:justify-center">
                        <Image src="/images/sp-logo-no-bg.png" alt="Shabad Papers Logo" width={40} height={40} />
                        <span className="whitespace-nowrap group-data-[state=collapsed]:hidden">Shabad Papers</span>
                    </Link>
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
                                        <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
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
                            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarSeparator className="my-1" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarTrigger asChild>
                            <SidebarMenuButton tooltip={open ? "Collapse" : "Expand"}>
                                {open ? <PanelLeftClose /> : <PanelLeftOpen />}
                                <span className="group-data-[collapsible=icon]:hidden">{open ? "Collapse" : "Expand"}</span>
                            </SidebarMenuButton>
                        </SidebarTrigger>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </>
    );
}
