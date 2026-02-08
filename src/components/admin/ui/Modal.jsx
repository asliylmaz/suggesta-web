import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

const Modal = ({ isOpen, onClose, title, children, footer, className }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            <div
                className={cn(
                    "relative w-full max-w-lg rounded-xl border bg-card p-0 shadow-lg animate-in fade-in zoom-in-95 duration-300 overflow-hidden",
                    className
                )}
            >
                <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 py-6 overflow-y-auto max-h-[70vh]">
                    {children}
                </div>

                {footer && (
                    <div className="flex justify-end gap-3 border-t border-border/50 px-6 py-4 bg-muted/10">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
export { Modal };
