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
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingCart, List, FileText, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/categories', label: 'Categories', icon: List },
    { href: '/admin/products', label: 'Products', icon: ShoppingCart },
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
        <aside className="w-64 bg-background border-r flex-col hidden md:flex">
            <div className="p-4 border-b h-20 flex items-center">
                <Link href="/admin/dashboard" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
                    <Image src="/images/sp-logo-no-bg.png" alt="Shabad Papers Logo" width={30} height={30} />
                    <span>Admin Panel</span>
                </Link>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin/dashboard');
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                isActive && "bg-muted text-primary"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 mt-auto border-t">
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
