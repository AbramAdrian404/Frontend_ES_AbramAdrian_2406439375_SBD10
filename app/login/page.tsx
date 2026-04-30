"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const allowedDomains = ["gmail.com", "yahoo.com", "icloud.com", "me.com"];

  const isValidEmailProvider = (email: string) => {
    return allowedDomains.some((domain) =>
      email.toLowerCase().endsWith(domain)
    );
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Isi email & password!");
      return;
    }

    if (!isValidEmailProvider(email)) {
      alert("Hanya boleh login dengan Gmail, Yahoo, atau Apple (iCloud)");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/products");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  const socialLogin = (provider: string) => {
    let fakeEmail = "";

    if (provider === "google") fakeEmail = "user@gmail.com";
    if (provider === "yahoo") fakeEmail = "user@yahoo.com";
    if (provider === "apple") fakeEmail = "user@icloud.com";

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: fakeEmail,
        balance: 0,
      })
    );

    router.push("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[400px]">
        <div className="flex items-center gap-3 mb-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        </div>

        <p className="text-gray-600 mb-6">Masuk untuk melanjutkan</p>

        <input
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <p className="px-3 text-gray-500 text-sm">atau</p>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => socialLogin("google")}
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              className="w-5"
            />
            Masuk dengan Google
          </button>

          <button
            onClick={() => socialLogin("yahoo")}
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968885.png"
              className="w-5"
            />
            Masuk dengan Yahoo
          </button>

          <button
            onClick={() => socialLogin("apple")}
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/0/747.png"
              className="w-5"
            />
            Masuk dengan Apple (iCloud)
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 font-semibold">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}