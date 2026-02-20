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
      const data = await login({ email, password });

      // Context üzerinden global state'i güncelle
      contextLogin(data.user, data.token);

    } catch (err) {
      setError(
        err?.response?.data?.message || "Giriş sırasında hata oluştu"
      );
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Suggesta’ya Giriş
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            className="h-11"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Şifre"
            className="h-11"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full h-11"
            disabled={loading}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>

          <div className="text-center">
            <Link href="/register" className="text-sm text-zinc-400 hover:text-white transition-colors hover:underline">
              Bir Hesabın Yok Mu? Kayıt Ol
            </Link>
          </div>
          <div className="text-center">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors hover:underline">
              Giriş Yapmadan Devam Et
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
