import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/ui/DataTable';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Badge } from '@/components/admin/ui/Badge';
import {
    Search,
    UserPlus,
    ShieldCheck,
    MoreHorizontal,
    Mail,
    Key
} from 'lucide-react';
import Modal from '@/components/admin/ui/Modal';

const adminsData = [
    { id: 1, name: 'Admin Kullanıcı', email: 'admin@suggesta.com', role: 'Süper Admin', status: 'Aktif', login: '2024-02-08 14:30' },
    { id: 2, name: 'Moderator_A', email: 'mod_a@suggesta.com', role: 'Editör', status: 'Aktif', login: '2024-02-08 10:15' },
    { id: 3, name: 'Moderator_B', email: 'mod_b@suggesta.com', role: 'İzleyici', status: 'Pasif', login: '2024-02-05 09:00' },
];

const AdminsPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const columns = [
        {
            key: 'name',
            title: 'Yönetici Adı',
            render: (val) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <ShieldCheck size={16} />
                    </div>
                    <span className="font-semibold">{val}</span>
                </div>
            )
        },
        { key: 'email', title: 'E-posta' },
        {
            key: 'role',
            title: 'Yetki Rolü',
            render: (role) => (
                <Badge variant="secondary" className="font-medium">
                    {role}
                </Badge>
            )
        },
        {
            key: 'status',
            title: 'Durum',
            render: (status) => (
                <Badge variant={status === 'Aktif' ? 'success' : 'outline'}>
                    {status}
                </Badge>
            )
        },
        { key: 'login', title: 'Son Giriş' },
    ];

    const actions = (row) => (
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal size={16} />
        </Button>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">Yönetici Ekibi</h1>
                        <p className="text-muted-foreground">Yönetici erişimlerini ve yetki seviyelerini yönetin.</p>
                    </div>
                    <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
                        <UserPlus size={18} />
                        <span>Yönetici Davet Et</span>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={adminsData}
                    actions={actions}
                    pagination={false}
                />

                <Modal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    title="Yeni Yönetici Davet Et"
                    footer={
                        <>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>İptal</Button>
                            <Button onClick={() => setIsAddModalOpen(false)}>Davetiye Gönder</Button>
                        </>
                    }
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tam Adı</label>
                            <Input placeholder="Kullanıcı ara..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Yönetici E-postası</label>
                            <div className="relative">
                                <Input placeholder="eposta@suggesta.com" className="pl-9" />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Yetki Seviyesi</label>
                            <div className="relative">
                                <select className="bg-background border border-input h-10 px-9 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 w-full appearance-none">
                                    <option>Süper Admin</option>
                                    <option>Editör</option>
                                    <option>İzleyici</option>
                                </select>
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default AdminsPage;
