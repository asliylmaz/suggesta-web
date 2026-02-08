import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentList from '@/components/admin/ContentList';

const moviesMockData = [
    { id: 1, title: 'Inception', category: 'Sci-Fi', rating: 8.8, createdBy: 'Admin', date: '2024-02-01', status: 'Published' },
    { id: 2, title: 'Interstellar', category: 'Sci-Fi', rating: 8.7, createdBy: 'Admin', date: '2024-01-20', status: 'Published' },
    { id: 3, title: 'The Godfather', category: 'Crime', rating: 9.2, createdBy: 'Admin', date: '2023-12-15', status: 'Published' },
    { id: 4, title: 'Pulp Fiction', category: 'Crime', rating: 8.9, createdBy: 'Admin', date: '2024-02-05', status: 'Pending' },
    { id: 5, title: 'The Dark Knight', category: 'Action', rating: 9.0, createdBy: 'Admin', date: '2024-01-10', status: 'Published' },
    { id: 6, title: 'Parasite', category: 'Thriller', rating: 8.6, createdBy: 'Editor', date: '2024-02-07', status: 'Rejected' },
];

const MoviesPage = () => {
    return (
        <AdminLayout>
            <ContentList
                type="Film"
                title="Filmler"
                description="Platformdaki tüm filmleri yönetin, onaylayın veya düzenleyin."
                data={moviesMockData}
            />
        </AdminLayout>
    );
};

export default MoviesPage;
