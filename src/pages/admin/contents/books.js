import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentList from '@/components/admin/ContentList';

const booksMockData = [
    { id: 1, title: 'The Great Gatsby', category: 'Classic', rating: 8.4, createdBy: 'Admin', date: '2024-01-15', status: 'Published' },
    { id: 2, title: '1984', category: 'Distopian', rating: 8.9, createdBy: 'Admin', date: '2024-02-01', status: 'Published' },
    { id: 3, title: 'The Alchemist', category: 'Fiction', rating: 8.1, createdBy: 'Editor', date: '2024-01-10', status: 'Published' },
    { id: 4, title: 'Project Hail Mary', category: 'Sci-Fi', rating: 8.8, createdBy: 'Admin', date: '2024-02-07', status: 'Pending' },
];

const BooksPage = () => {
    return (
        <AdminLayout>
            <ContentList
                type="Kitap"
                title="Kitaplar"
                description="Platformdaki tüm kitapları yönetin, onaylayın veya düzenleyin."
                data={booksMockData}
            />
        </AdminLayout>
    );
};

export default BooksPage;
