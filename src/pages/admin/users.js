import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/ui/DataTable';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Badge } from '@/components/admin/ui/Badge';
import {
    Search,
    Filter,
    UserPlus,
    Eye,
    Edit2,
    Trash2,
    Ban,
    CheckCircle2,
    User
} from 'lucide-react';
import Modal from '@/components/admin/ui/Modal';

const usersData = [
    { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', role: 'admin', status: 'active', date: '2024-01-15', avatar: 'JD' },
    { id: 2, name: 'Alice Smith', username: 'alices', email: 'alice@example.com', role: 'user', status: 'active', date: '2024-02-01', avatar: 'AS' },
    { id: 3, name: 'Bob Wilson', username: 'bobw', email: 'bob@example.com', role: 'user', status: 'banned', date: '2023-12-20', avatar: 'BW' },
    { id: 4, name: 'Emma Brown', username: 'emmav', email: 'emma@example.com', role: 'user', status: 'active', date: '2024-02-05', avatar: 'EB' },
    { id: 5, name: 'Chris Evans', username: 'chrise', email: 'chris@example.com', role: 'admin', status: 'active', date: '2024-01-10', avatar: 'CE' },
    { id: 6, name: 'Sarah Miller', username: 'sarahm', email: 'sarah@example.com', role: 'user', status: 'active', date: '2024-02-07', avatar: 'SM' },
    { id: 7, name: 'David Lee', username: 'davidl', email: 'david@example.com', role: 'user', status: 'active', date: '2024-01-25', avatar: 'DL' },
];

const UsersManagement = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const columns = [
        {
            key: 'name',
            title: 'Kullanıcı',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                        {row.avatar}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">{row.name}</span>
                        <span className="text-xs text-muted-foreground">@{row.username}</span>
                    </div>
                </div>
            ),
        },
        { key: 'email', title: 'E-posta' },
        {
            key: 'role',
            title: 'Rol',
            render: (role) => (
                <Badge variant={role === 'admin' ? 'secondary' : 'outline'} className="capitalize">
                    {role === 'admin' ? 'Yönetici' : 'Üye'}
                </Badge>
            )
        },
        {
            key: 'status',
            title: 'Durum',
            render: (status) => (
                <Badge variant={status === 'active' ? 'success' : 'destructive'} className="gap-1 px-2">
                    {status === 'active' ? <CheckCircle2 size={10} /> : <Ban size={10} />}
                    {status === 'active' ? 'Aktif' : 'Yasaklı'}
                </Badge>
            )
        },
        { key: 'date', title: 'Kayıt Tarihi' },
    ];

    const actions = (row) => (
        <>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <Eye size={16} />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => handleEdit(row)}
            >
                <Edit2 size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                <Trash2 size={16} />
            </Button>
        </>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">Kullanıcı Yönetimi</h1>
                        <p className="text-muted-foreground">Platform kullanıcılarını, rollerini ve durumlarını yönetin.</p>
                    </div>
                    <Button className="gap-2 self-start sm:self-auto">
                        <UserPlus size={18} />
                        <span>Yeni Kullanıcı Ekle</span>
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border/50">
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input placeholder="İsim, e-posta ile ara..." className="pl-9" />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Button variant="outline" className="gap-2 w-full sm:w-auto">
                            <Filter size={16} />
                            <span>Filtreler</span>
                        </Button>
                        <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block"></div>
                        <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto">
                            <option>Tüm Roller</option>
                            <option>Yönetici</option>
                            <option>Üye</option>
                        </select>
                        <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto">
                            <option>Tüm Durumlar</option>
                            <option>Aktif</option>
                            <option>Yasaklı</option>
                        </select>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={usersData}
                    actions={actions}
                    pagination={true}
                />

                {/* Edit User Modal */}
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title={`Kullanıcı Düzenle: ${selectedUser?.name}`}
                    footer={
                        <>
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>İptal</Button>
                            <Button onClick={() => setIsEditModalOpen(false)}>Değişiklikleri Kaydet</Button>
                        </>
                    }
                >
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Ad Soyad</label>
                            <Input defaultValue={selectedUser?.name} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">E-posta Adresi</label>
                            <Input defaultValue={selectedUser?.email} type="email" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Rol</label>
                                <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20" defaultValue={selectedUser?.role}>
                                    <option value="admin">Yönetici</option>
                                    <option value="user">Üye</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Durum</label>
                                <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20" defaultValue={selectedUser?.status}>
                                    <option value="active">Aktif</option>
                                    <option value="banned">Yasaklı</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default UsersManagement;
