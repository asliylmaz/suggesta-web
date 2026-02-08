import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentList from '@/components/admin/ContentList';

const placesMockData = [
    { id: 1, title: 'Eiffel Tower', category: 'Attraction', rating: 8.8, createdBy: 'Admin', date: '2024-01-05', status: 'Published' },
    { id: 2, title: 'Grand Canyon', category: 'Nature', rating: 9.3, createdBy: 'Editor', date: '2024-02-02', status: 'Published' },
    { id: 3, title: 'Louvre Museum', category: 'Museum', rating: 8.7, createdBy: 'Admin', date: '2024-01-25', status: 'Pending' },
    { id: 4, title: 'Tokyo Tower', category: 'Attraction', rating: 8.5, createdBy: 'Admin', date: '2023-12-15', status: 'Published' },
];

const PlacesPage = () => {
    return (
        <AdminLayout>
            <ContentList
                type="Mekan"
                title="Mekanlar"
                description="Platformdaki tüm mekanları yönetin, onaylayın veya düzenleyin."
                data={placesMockData}
            />
        </AdminLayout>
    );
};

export default PlacesPage;
