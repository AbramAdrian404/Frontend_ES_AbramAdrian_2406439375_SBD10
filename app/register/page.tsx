"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Isi semua data!");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          email,
          password,
        }
      );

      alert("Register berhasil!");
      router.push("/login");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">

      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[400px]">

        <div className="flex items-center gap-3 mb-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h1 className="text-3xl font-bold text-gray-900">
            Register
          </h1>
        </div>

        <p className="text-gray-600 mb-6">
          Buat akun baru
        </p>

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
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center mt-6 text-gray-600">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}