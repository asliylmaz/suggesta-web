import { useState } from "react";
import { login } from "@/lib/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginForm() {
  const { login: contextLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email ve şifre zorunlu");
      return;
    }

    try {
      setLoading(true);
      const response = await login({ email, password });

      // Context üzerinden global state'i güncelle. Backend 'data.data' içinde user ve token dönüyor.
      contextLogin(response.data.user, response.data.token);

    } catch (err) {
      setError(
        err?.response?.data?.message || "Giriş sırasında hata oluştu"
      );
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
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl md:text-4xl text-center font-black text-white italic tracking-tighter uppercase relative z-10">
          Suggesta'ya <span className="text-zinc-500">Giriş</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <Input
            type="email"
            placeholder="Email"
            className="bg-black/40 border-white/10 rounded-full h-14 px-6 text-white/90 placeholder-white/40 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-medium transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Şifre"
            className="bg-black/40 border-white/10 rounded-full h-14 px-6 text-white/90 placeholder-white/40 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-medium transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </div>

          <div className="text-center pt-2">
            <Link href="/register" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hover:underline">
              Bir Hesabın Yok Mu? Kayıt Ol
            </Link>
          </div>
          <div className="text-center">
            <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-white transition-colors hover:underline">
              Giriş Yapmadan Devam Et
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
