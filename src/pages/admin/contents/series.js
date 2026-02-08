import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentList from '@/components/admin/ContentList';

const seriesMockData = [
    { id: 1, title: 'Breaking Bad', category: 'Crime', rating: 9.5, createdBy: 'Admin', date: '2024-01-05', status: 'Published' },
    { id: 2, title: 'House of the Dragon', category: 'Fantasy', rating: 8.5, createdBy: 'Admin', date: '2024-02-02', status: 'Pending' },
    { id: 3, title: 'Succession', category: 'Drama', rating: 8.8, createdBy: 'Editor', date: '2024-01-25', status: 'Published' },
    { id: 4, title: 'The Bear', category: 'Drama', rating: 8.7, createdBy: 'Admin', date: '2024-02-04', status: 'Published' },
    { id: 5, title: 'The White Lotus', category: 'Comedy', rating: 7.9, createdBy: 'Editor', date: '2023-12-28', status: 'Published' },
];

const SeriesPage = () => {
    return (
        <AdminLayout>
            <ContentList
                type="Dizi"
                title="Diziler"
                description="Platformdaki tüm dizileri yönetin, onaylayın veya düzenleyin."
                data={seriesMockData}
            />
        </AdminLayout>
    );
};

export default SeriesPage;
