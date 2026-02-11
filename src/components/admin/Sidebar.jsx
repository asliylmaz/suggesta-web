import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    LayoutDashboard,
    Users,
    Film,
    Tv,
    BookOpen,
    MapPin,
    Layers,
    Star,
    Flag,
    ShieldCheck,
    Settings,
    ChevronLeft,
    Menu,
    ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';

const menuItems = [
    { name: 'Panel Özeti', icon: LayoutDashboard, href: '/admin' },
    { name: 'Kullanıcılar', icon: Users, href: '/admin/users' },
    {
        name: 'İçerikler',
        icon: Film,
        href: '#',
        children: [
            { name: 'Diziler', icon: Tv, href: '/admin/contents/series' },
            { name: 'Filmler', icon: Film, href: '/admin/contents/movies' },
            { name: 'Kitaplar', icon: BookOpen, href: '/admin/contents/books' },
            { name: 'Mekanlar', icon: MapPin, href: '/admin/contents/places' },
        ]
    },
    { name: 'Kategoriler', icon: Layers, href: '/admin/categories' },
    { name: 'Değerlendirmeler', icon: Star, href: '/admin/reviews' },
    { name: 'Raporlar', icon: Flag, href: '/admin/reports' },
    { name: 'Yöneticiler', icon: ShieldCheck, href: '/admin/admins' },
    { name: 'Ayarlar', icon: Settings, href: '/admin/settings' },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
    const router = useRouter();
    const [expandedContent, setExpandedContent] = useState(true);

    return (
        <aside
            className={cn(
                'fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-sidebar-border bg-sidebar text-sidebar-foreground',
                collapsed ? 'w-20' : 'w-64'
            )}
        >
            <div className="flex flex-col h-full">
                {/* Logo Area */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
                    {!collapsed && (
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
                            <div className="w-8 h-8 rounded-none bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold">S</span>
                            </div>
                            <span>Suggesta</span>
                        </Link>
                    )}
                    {collapsed && (
                        <div className="w-8 h-8 mx-auto rounded-none bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">S</span>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex items-center justify-center w-8 h-8 rounded-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    >
                        {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide">
                    <ul className="space-y-1 px-3">
                        {menuItems.map((item) => {
                            const isActive = router.pathname === item.href || (item.children && item.children.some(child => router.pathname === child.href));
                            const hasChildren = !!item.children;

                            return (
                                <li key={item.name}>
                                    {hasChildren ? (
                                        <div>
                                            <button
                                                onClick={() => !collapsed && setExpandedContent(!expandedContent)}
                                                className={cn(
                                                    'flex items-center w-full gap-3 px-3 py-2 rounded-none transition-all duration-200 group',
                                                    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground'
                                                )}
                                            >
                                                <item.icon size={20} className={cn('min-w-[20px]', isActive ? 'text-primary' : 'group-hover:text-primary')} />
                                                {!collapsed && (
                                                    <>
                                                        <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
                                                        <ChevronDown size={14} className={cn('transition-transform', expandedContent ? 'rotate-180' : '')} />
                                                    </>
                                                )}
                                            </button>

                                            {!collapsed && expandedContent && (
                                                <ul className="mt-1 ml-9 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                                    {item.children.map((child) => {
                                                        const isChildActive = router.pathname === child.href;
                                                        return (
                                                            <li key={child.name}>
                                                                <Link
                                                                    href={child.href}
                                                                    className={cn(
                                                                        'block px-3 py-1.5 rounded-none text-xs font-medium transition-colors',
                                                                        isChildActive ? 'text-primary' : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
                                                                    )}
                                                                >
                                                                    {child.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2 rounded-none transition-all duration-200 group',
                                                isActive ? 'bg-sidebar-accent text-primary' : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground'
                                            )}
                                        >
                                            <item.icon size={20} className={cn('min-w-[20px]', isActive ? 'text-primary' : 'group-hover:text-primary')} />
                                            {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer Info */}
                {!collapsed && (
                    <div className="p-4 border-t border-sidebar-border">
                        <div className="flex items-center gap-3 p-2 rounded-none bg-sidebar-accent/30">
                            <div className="w-8 h-8 rounded-none bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                                JD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold truncate">Yönetici</p>
                                <p className="text-[10px] text-sidebar-foreground/50 truncate">admin@suggesta.com</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
