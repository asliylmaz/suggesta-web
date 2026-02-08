import React from 'react';
import { Search, Bell, Moon, Sun, LogOut, User } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const Topbar = () => {
    return (
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 px-6 flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-md gap-4">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Her şeyi ara..."
                        className="pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
                </Button>
                <div className="h-6 w-[1px] bg-border mx-2"></div>
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-sm font-medium">Yönetici</span>
                        <span className="text-[10px] text-muted-foreground italic">Süper Admin</span>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center p-0.5 border border-primary/20 group-hover:border-primary/50 transition-colors">
                        <div className="w-full h-full rounded-md bg-primary/20 flex items-center justify-center text-primary">
                            <User size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
