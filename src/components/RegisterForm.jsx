import { useState } from "react";
import { register } from "@/lib/authService";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    birthdate: "",
  });

  const { login: contextLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isUnder13 = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    return age < 13;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, surname, email, username, password, birthdate } = form;

    if (!name || !surname || !email || !username || !password || !birthdate) {
      setError("Tüm alanlar zorunludur");
      return;
    }

    if (isUnder13(birthdate)) {
      setError("13 yaşından küçükler kayıt olamaz");
      return;
    }

    try {
      setLoading(true);
      const response = await register(form);
      alert("Kayıt başarılı");
      if (response?.data?.user && response?.data?.token) {
        contextLogin(response.data.user, response.data.token);
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Kayıt sırasında hata oluştu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-black/20 border-white/5 rounded-[32px] backdrop-blur-[20px] p-2 md:p-4 overflow-hidden relative">
      {/* Subtle top gradient */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl text-center font-black text-white italic tracking-tighter uppercase relative z-10">
          Kayıt <span className="text-zinc-500">Ol</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <Input
            name="name"
            placeholder="Ad"
            value={form.name}
            onChange={handleChange}
            className="bg-black/40 border-white/10 rounded-full h-14 px-6 text-white/90 placeholder-white/40 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-medium transition-all"
          />

          <Input
            name="surname"
            placeholder="Soyad"
            value={form.surname}
            onChange={handleChange}
            className="bg-black/40 border-white/10 rounded-full h-14 px-6 text-white/90 placeholder-white/40 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-medium transition-all"
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-black/40 border-white/10 rounded-full h-14 px-6 text-white/90 placeholder-white/40 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-medium transition-all"
          />

          <Input
            name="username"
            placeholder="Kullanıcı Adı"
            value={form.username}
            onChange={handleChange}
            className="bg-black/40 border-white/10 rounded-full h-14 px-6 text-white/90 placeholder-white/40 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-medium transition-all"
          />


          <Input
            type="password"
            name="password"
            placeholder="Şifre"
            value={form.password}
            onChange={handleChange}
            className="bg-black/40 border-white/10 rounded-full h-14 px-6 text-white/90 placeholder-white/40 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-medium transition-all"
          />

          <Input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
            className="bg-black/40 border-white/10 rounded-full h-14 px-6 text-white/80 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-medium transition-all uppercase tracking-wider text-sm"
          />

          {error && (
            <p className="text-sm font-semibold text-red-400 text-center bg-red-500/10 py-2 rounded-full border border-red-500/20">
              {error}
            </p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-14 rounded-full text-black font-bold tracking-wide uppercase transition-all duration-300 transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(90deg, #fff, #e5e5e5)',
                boxShadow: '0 8px 20px rgba(255,255,255,0.15)'
              }}
              disabled={loading}
            >
              {loading ? "Kaydediliyor..." : "Kayıt Ol"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
