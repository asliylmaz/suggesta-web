import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/admin/ui/Card';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Badge } from '@/components/admin/ui/Badge';
import { Plus, Search, Edit2, Trash2, Layers, MoreHorizontal } from 'lucide-react';
import Modal from '@/components/admin/ui/Modal';

const categoriesData = [
    { id: 1, name: 'Sci-Fi', type: 'Movies/Series', count: 124 },
    { id: 2, name: 'Classic', type: 'Books', count: 86 },
    { id: 3, name: 'Attraction', type: 'Places', count: 52 },
    { id: 4, name: 'Crime', type: 'Movies/Series', count: 98 },
    { id: 5, name: 'Nature', type: 'Places', count: 44 },
    { id: 6, name: 'Fantasy', type: 'Movies/Series', count: 112 },
    { id: 7, name: 'Dram', type: 'Movies/Series', count: 156 },
];

const CategoriesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Renamed state variable

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">Kategoriler</h1> {/* Translated title */}
                        <p className="text-muted-foreground">Film, dizi ve kitaplar için kategorileri yönetin.</p> {/* Translated description */}
                    </div>
                    <Button className="gap-2" onClick={() => setIsModalOpen(true)}> {/* Updated state variable */}
                        <Plus size={18} />
                        <span>Yeni Kategori</span> {/* Translated button text */}
                    </Button>
                </div>

                <div className="relative max-w-sm"> {/* Simplified search input container */}
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Kategori ara..." className="pl-9" /> {/* Translated placeholder */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoriesData.map((category) => (
                        <Card key={category.id} className="group hover:border-primary/50 transition-colors"> {/* Updated Card className */}
                            <CardContent className="p-6"> {/* Updated CardContent padding */}
                                <div className="flex items-start justify-between">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <Layers size={24} /> {/* Used Layers as a placeholder for category.icon */}
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal size={16} /> {/* Added MoreHorizontal button */}
                                    </Button>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-bold text-lg">{category.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="secondary" size="sm">{category.type === 'Movies/Series' ? 'Film/Dizi' : category.type === 'Books' ? 'Kitap' : 'Yer'}</Badge> {/* Updated badge logic and translation */}
                                        <span className="text-xs text-muted-foreground">{category.count} içerik</span> {/* Translated count text */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Add Category Modal */}
                <Modal
                    onClose={() => setIsAddModalOpen(false)}
                    title="Add New Category"
                    footer={
                        <>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsAddModalOpen(false)}>Create Category</Button>
                        </>
                    }
                >
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Category Name</label>
                            <Input placeholder="e.g. Science Fiction" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Content Type</label>
                            <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20">
                                <option>Movies/Series</option>
                                <option>Books</option>
                                <option>Places</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Description (Optional)</label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                                placeholder="Brief description of the category..."
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default CategoriesPage;
