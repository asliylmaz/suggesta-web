import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/ui/DataTable';
import { Button } from '@/components/admin/ui/Button';
import { Badge } from '@/components/admin/ui/Badge';
import { Star, Trash2, Eye, Search } from 'lucide-react';
import Modal from '@/components/admin/ui/Modal';
import { Input } from '@/components/admin/ui/Input';

const reviewsData = [
    { id: 1, content: 'Inception', user: 'John Doe', rating: 10, comment: 'Mind-blowing masterpiece! The soundtrack and the visual effects are out of this world.', date: '2024-02-08' },
    { id: 2, content: 'Breaking Bad', user: 'Alice Smith', rating: 9, comment: 'One of the best TV shows ever made. Bryan Cranston is a legend.', date: '2024-02-07' },
    { id: 3, content: 'The Alchemist', user: 'Bob Wilson', rating: 7, comment: 'Good book but a bit overhyped. Still worth reading.', date: '2024-02-05' },
    { id: 4, content: 'Interstellar', user: 'Emma Brown', rating: 10, comment: 'The ending always makes me cry. Nolan is a genius.', date: '2024-02-03' },
    { id: 5, content: 'Eiffel Tower', user: 'Chris Evans', rating: 8, comment: 'Beautiful place, but very crowded. Go early in the morning.', date: '2024-02-01' },
];

const ReviewsPage = () => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const columns = [
        {
            key: 'content',
            title: 'İçerik',
            render: (val) => <span className="font-semibold text-primary">{val}</span>
        },
        {
            key: 'user',
            title: 'Kullanıcı',
            render: (user) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                        {user.charAt(0)}
                    </div>
                    <span className="text-sm">{user}</span>
                </div>
            )
        },
        {
            key: 'rating',
            title: 'Puan',
            render: (rating) => (
                <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                    <span className="font-bold">{rating}</span>
                </div>
            )
        },
        {
            key: 'comment',
            title: 'Yorum',
            render: (val) => <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{val}</span>
        },
        { key: 'date', title: 'Tarih' },
    ];

    const actions = (row) => (
        <>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewDetails(row)}>
                <Eye size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                <Trash2 size={16} />
            </Button>
        </>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Değerlendirmeler</h1>
                    <p className="text-muted-foreground">Kullanıcı yorumlarını ve puanlarını denetleyin.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border/50">
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input placeholder="İçerik veya kullanıcı ara..." className="pl-9" />
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={reviewsData}
                    actions={actions}
                    pagination={true}
                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Değerlendirme Detayı"
                    footer={
                        <>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Kapat</Button>
                            <Button variant="danger" className="gap-2">
                                <Trash2 size={16} />
                                Yorumu Sil
                            </Button>
                        </>
                    }
                >
                    {selectedReview && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {selectedReview.user.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{selectedReview.user}</h4>
                                        <p className="text-xs text-muted-foreground">{selectedReview.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20">
                                    <Star size={16} className="fill-yellow-500" />
                                    <span className="font-bold">{selectedReview.rating}</span>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-1 tracking-wider">İçerik</h5>
                                <p className="font-medium text-primary text-lg">{selectedReview.content}</p>
                            </div>
                            <div>
                                <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-1 tracking-wider">Yorum</h5>
                                <p className="text-sm leading-relaxed bg-muted/50 p-4 rounded-lg italic">
                                    "{selectedReview.comment}"
                                </p>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default ReviewsPage;
