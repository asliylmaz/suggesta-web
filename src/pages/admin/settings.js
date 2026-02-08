import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/admin/ui/Card';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import {
    Settings as SettingsIcon,
    LogOut,
    ShieldAlert,
    User,
    Mail,
    Globe,
    Bell
} from 'lucide-react';

const SettingsPage = () => {
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
                    <p className="text-muted-foreground">Profilinizi ve sistem tercihlerini yönetin.</p>
                </div>

                <div className="grid gap-8">
                    {/* Admin Profile */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl border border-primary/20">
                                A
                            </div>
                            <div className="flex flex-col">
                                <CardTitle>Yönetici Profili</CardTitle>
                                <CardDescription>Kişisel bilgilerinizi ve profil fotoğrafınızı güncelleyin.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium italic">Ad Soyad</label>
                                    <Input defaultValue="Admin Kullanıcı" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium italic">E-posta</label>
                                    <Input defaultValue="admin@suggesta.com" type="email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium italic">Biyografi</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none"
                                    defaultValue="Suggesta platformu baş moderatörü."
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end border-t border-border/50 pt-6">
                            <Button>Bilgileri Kaydet</Button>
                        </CardFooter>
                    </Card>

                    {/* System Preferences */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <SettingsIcon size={18} className="text-primary" />
                                <CardTitle>Sistem Tercihleri</CardTitle>
                            </div>
                            <CardDescription>Panel dilini ve diğer sistem ayarlarını yapılandırın.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium">Panel Dili</div>
                                    <div className="text-xs text-muted-foreground italic">Varsayılan dil ayarı.</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Globe size={16} className="text-muted-foreground" />
                                    <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 min-w-[140px]">
                                        <option>Türkçe</option>
                                        <option disabled>English (Disabled)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="text-sm font-medium">Bildirimler</div>
                                    <div className="text-xs text-muted-foreground italic">Yeni içerik ve raporlar için e-posta al.</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Bell size={16} className="text-muted-foreground" />
                                    <div className="w-10 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-4 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="border-destructive/20 bg-destructive/5">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-destructive">
                                <ShieldAlert size={18} />
                                <CardTitle>Hesap Yönetimi</CardTitle>
                            </div>
                            <CardDescription className="text-destructive/70 italic">Kritik işlemleri buradan gerçekleştirebilirsiniz.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                            <Button variant="outline" className="w-full sm:w-auto gap-2 border-destructive/20 hover:bg-destructive/10 text-destructive">
                                <LogOut size={16} />
                                Oturumu Kapat
                            </Button>
                            <Button variant="danger" className="w-full sm:w-auto gap-2">
                                Şifreyi Değiştir
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingsPage;
