import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/ui/DataTable';
import { Button } from '@/components/admin/ui/Button';
import { Badge } from '@/components/admin/ui/Badge';
import {
    AlertCircle,
    CheckCircle,
    Eye,
    Trash2,
    Ban,
    Search
} from 'lucide-react';
import Modal from '@/components/admin/ui/Modal';
import { Input } from '@/components/admin/ui/Input';

const reportsData = [
    { id: 1, item: 'Inception (Film)', reason: 'Telif Hakkı İhlali', count: 12, status: 'Pending', lastReported: '2024-02-08 14:30' },
    { id: 2, item: 'Kullanıcı_123 Yorumu', reason: 'Uygunsuz İçerik', count: 5, status: 'Resolved', lastReported: '2024-02-07 10:15' },
    { id: 3, item: 'Breaking Bad (Dizi)', reason: 'Hatalı Bilgi', count: 3, status: 'Pending', lastReported: '2024-02-08 09:00' },
];

const ReportsPage = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReview = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const columns = [
        {
            key: 'item',
            title: 'Şikayet Edilen Öğe',
            render: (val) => <span className="font-semibold text-primary">{val}</span>
        },
        { key: 'reason', title: 'Neden' },
        {
            key: 'count',
            title: 'Şikayet Sayısı',
            render: (count) => (
                <Badge variant="secondary" className="font-mono">{count}</Badge>
            )
        },
        {
            key: 'status',
            title: 'Durum',
            render: (status) => (
                <Badge variant={status === 'Pending' ? 'warning' : 'success'} className="gap-1">
                    {status === 'Pending' ? <AlertCircle size={10} /> : <CheckCircle size={10} />}
                    {status === 'Pending' ? 'İnceleniyor' : 'Çözüldü'}
                </Badge>
            )
        },
        { key: 'lastReported', title: 'Son Şikayet' },
    ];

    const actions = (row) => (
        <>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReview(row)}>
                <Eye size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Yoksay">
                <Ban size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" title="İçeriği Sil">
                <Trash2 size={16} />
            </Button>
        </>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Şikayet Raporları</h1>
                    <p className="text-muted-foreground">İşaretlenen içerikleri inceleyin ve moderasyon işlemlerini gerçekleştirin.</p>
                </div>

                <DataTable
                    columns={columns}
                    data={reportsData}
                    actions={actions}
                    pagination={true}
                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Şikayet İncele"
                    footer={
                        <>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Kapat</Button>
                            <Button variant="ghost" className="text-destructive hover:bg-destructive/10">İçeriği Kaldır</Button>
                            <Button onClick={() => setIsModalOpen(false)}>Şikayeti Yoksay</Button>
                        </>
                    }
                >
                    {selectedReport && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1 tracking-wider">Şikayet Edilen</h4>
                                    <p className="text-xl font-bold text-primary">{selectedReport.item}</p>
                                </div>
                                <Badge variant="destructive" className="h-8 px-4 text-sm font-bold">
                                    {selectedReport.count} Toplam Şikayet
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Şikayet Nedeni</h4>
                                <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-destructive font-medium">
                                    {selectedReport.reason}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Son Raporlar</h4>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="text-sm p-3 bg-muted/50 rounded-md border border-border/50">
                                            "Bu içerik topluluk kurallarımızı ihlal ediyor olabilir."
                                            <div className="text-[10px] text-muted-foreground mt-1 tracking-wide">Kullanıcı_{i + 100} • 2s önce</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default ReportsPage;
