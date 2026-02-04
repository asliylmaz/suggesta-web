import { useState } from "react";
import { register } from "@/lib/authService";
import Router from "next/router";
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = Router;
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
      await register(form);
      alert("Kayıt başarılı");
      router.push("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Kayıt sırasında hata oluştu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Kayıt Ol
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Ad"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            name="surname"
            placeholder="Soyad"
            value={form.surname}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            name="username"
            placeholder="Kullanıcı Adı"
            value={form.username}
            onChange={handleChange}
          />


          <Input
            type="password"
            name="password"
            placeholder="Şifre"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
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
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
