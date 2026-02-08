import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary/20 text-primary border-primary/20 hover:bg-primary/30',
                secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground hover:bg-accent hover:text-accent-foreground border-border',
                success: 'border-transparent bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20',
                warning: 'border-transparent bg-amber-500/15 text-amber-500 hover:bg-amber-500/20',
                info: 'border-transparent bg-blue-500/15 text-blue-500 hover:bg-blue-500/20',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
