import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { cn } from '@/lib/utils';

const AdminLayout = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
            {/* Sidebar - Desktop */}
            <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

            {/* Main Content Area */}
            <div
                className={cn(
                    'min-h-screen transition-all duration-300 ease-in-out',
                    sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
                )}
            >
                <Topbar />
                <main className="p-6 animate-in fade-in duration-500">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay (could be added later for full mobile responsiveness) */}
            {/* For now focusing on desktop-first as requested */}
        </div>
    );
};

export default AdminLayout;
