'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const handlePageChange = (page) => {
        if (page !== currentPage && page !== '...' && page >= 1 && page <= totalPages) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex justify-center items-center space-x-2 mb-16 animate-fade-in-up">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-card border border-border hover:bg-accent hover:border-primary/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 group"
            >
                <ChevronLeft size={20} className="group-hover:text-primary transition-colors" />
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        disabled={page === '...'}
                        className={`min-w-[44px] h-11 rounded-xl font-medium text-sm transition-all duration-300 ${page === currentPage
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110'
                                : page === '...'
                                    ? 'bg-transparent text-muted-foreground cursor-default'
                                    : 'bg-card border border-border hover:bg-accent hover:border-primary/50 hover:scale-105 active:scale-95'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-card border border-border hover:bg-accent hover:border-primary/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 group"
            >
                <ChevronRight size={20} className="group-hover:text-primary transition-colors" />
            </button>
        </div>
    );
}
