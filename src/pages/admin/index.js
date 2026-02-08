import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/admin/ui/Card';
import { Badge } from '@/components/admin/ui/Badge';
import {
    Users,
    Film,
    TrendingUp,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    PlusCircle,
    Eye
} from 'lucide-react';
import { Button } from '@/components/admin/ui/Button';

const stats = [
    {
        title: 'Toplam Kullanıcı',
        value: '12,456',
        change: '+12.5%',
        trend: 'up',
        icon: Users,
        description: 'Bu ayki aktif kullanıcılar'
    },
    {
        title: 'Toplam İçerik',
        value: '3,842',
        change: '+3.2%',
        trend: 'up',
        icon: Film,
        description: 'Film, dizi ve kitaplar'
    },
    {
        title: 'Bugün Eklenenler',
        value: '24',
        change: '+5.4%',
        trend: 'up',
        icon: PlusCircle,
        description: 'Düne göre artış'
    },
    {
        title: '7g Aktif Kullanıcı',
        value: '8,230',
        change: '-2.1%',
        trend: 'down',
        icon: Activity,
        description: 'Geçen haftaya göre düşüş'
    },
];

const dashboardData = {
    recentContents: [
        { id: 1, title: 'Inception', type: 'Film', category: 'Bilim Kurgu', date: '2024-02-08', status: 'Published' },
        { id: 2, title: 'Breaking Bad', type: 'Dizi', category: 'Polisiye', date: '2024-02-07', status: 'Pending' },
        { id: 3, title: 'Muhteşem Gatsby', type: 'Kitap', category: 'Klasik', date: '2024-02-07', status: 'Published' },
        { id: 4, title: 'Interstellar', type: 'Film', category: 'Bilim Kurgu', date: '2024-02-06', status: 'Published' },
        { id: 5, title: 'House of the Dragon', type: 'Dizi', category: 'Fantastik', date: '2024-02-06', status: 'Rejected' },
    ],
    recentUsers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-02-08', avatar: 'JD' },
        { id: 2, name: 'Alice Smith', email: 'alice@example.com', date: '2024-02-08', avatar: 'AS' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', date: '2024-02-07', avatar: 'BW' },
        { id: 4, name: 'Emma Brown', email: 'emma@example.com', date: '2024-02-07', avatar: 'EB' },
        { id: 5, name: 'Chris Evans', email: 'chris@example.com', date: '2024-02-06', avatar: 'CE' },
    ]
};

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Page Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Panel Özeti</h1>
                    <p className="text-muted-foreground">Platform performansını ve son aktiviteleri takip edin.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <stat.icon size={16} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    {stat.trend === 'up' ? (
                                        <ArrowUpRight size={14} className="text-emerald-500" />
                                    ) : (
                                        <ArrowDownRight size={14} className="text-destructive" />
                                    )}
                                    <span className={stat.trend === 'up' ? 'text-emerald-500 text-xs font-semibold' : 'text-destructive text-xs font-semibold'}>
                                        {stat.change}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground ml-1">{stat.description}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Mockup Area */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Günlük Kullanıcı Artışı</CardTitle>
                            <CardDescription>Son 7 gündeki kullanıcı kayıtları.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[240px] w-full flex items-end justify-between gap-2 pt-10">
                                {[45, 60, 48, 75, 90, 65, 80].map((height, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div
                                            className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-md transition-all duration-500 ease-out relative group-hover:scale-y-105 origin-bottom"
                                            style={{ height: `${height}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                {height * 10}
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">{i + 1}. Gün</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>İçerik Dağılımı</CardTitle>
                            <CardDescription>İçerik türüne göre dağılım.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center pt-8">
                            <div className="relative w-48 h-48 rounded-full border-8 border-primary/20 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-t-8 border-l-8 border-primary rotate-45"></div>
                                <div className="text-center">
                                    <span className="text-3xl font-bold">3.8K</span>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Toplam</p>
                                </div>
                            </div>
                            <div className="ml-8 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="text-xs font-medium">Film (45%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                                    <span className="text-xs font-medium">Dizi (30%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                                    <span className="text-xs font-medium">Kitap (25%)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tables Section */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Son Eklenen İçerikler</CardTitle>
                                <CardDescription>Platforma eklenen son öğeler.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">Tümünü Gör</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {dashboardData.recentContents.map((content) => (
                                    <div key={content.id} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                                {content.type === 'Film' ? <Film size={18} /> : content.type === 'Dizi' ? <TrendingUp size={18} /> : <Eye size={18} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium group-hover:text-primary transition-colors">{content.title}</p>
                                                <p className="text-xs text-muted-foreground">{content.type} • {content.category}</p>
                                            </div>
                                        </div>
                                        <Badge variant={content.status === 'Published' ? 'success' : content.status === 'Pending' ? 'warning' : 'destructive'}>
                                            {content.status === 'Published' ? 'Yayında' : content.status === 'Pending' ? 'Bekliyor' : 'Reddedildi'}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Yeni Kullanıcılar</CardTitle>
                                <CardDescription>Son katılan üyelerimiz.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">Tümünü Gör</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {dashboardData.recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium group-hover:text-primary transition-colors">{user.name}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {user.date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
