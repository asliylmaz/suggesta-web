import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';

const DataTable = ({ columns, data, actions, pagination }) => {
    return (
        <div className="w-full">
            <div className="rounded-md border border-border/50 bg-card overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border/50 bg-muted/30">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={cn(
                                        'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                                        column.className
                                    )}
                                >
                                    {column.title}
                                </th>
                            ))}
                            {actions && (
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[100px]">
                                    İşlemler
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <tr
                                    key={row.id || index}
                                    className="border-b border-border/40 transition-colors hover:bg-muted/20 last:border-0"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={`${row.id || index}-${column.key}`}
                                            className={cn('p-4 align-middle', column.className)}
                                        >
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                {actions(row)}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    Sonuç bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="flex items-center justify-between px-2 py-4">
                    <div className="text-sm text-muted-foreground">
                        <span className="font-medium">1</span> - <span className="font-medium">10</span> / <span className="font-medium">100</span> kayıt gösteriliyor
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
export { DataTable };
