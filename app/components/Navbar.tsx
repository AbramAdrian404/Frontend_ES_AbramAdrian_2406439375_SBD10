"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";

const handleTopUp = async () => {
  const amount = Number(prompt("Masukkan nominal:"));

  if (!amount) return;

  const res = await axios.post("http://localhost:5000/topup", {
    email: user.email,
    amount,
  });

  const updatedUser = { ...user, balance: res.data.balance };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  setUser(updatedUser);
};  

export default function Navbar() {
  const { cart } = useCart();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleTopUp = () => {
    const amount = prompt("Masukkan jumlah top up:");
    if (!amount) return;

    const updatedUser = {
      ...user,
      balance: (user.balance || 0) + Number(amount),
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="bg-white shadow px-6 py-3 flex items-center justify-between">

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.png" className="w-8" />
        <span className="text-xl font-bold text-yellow-500">
          Electrical Store
        </span>
      </Link>

      {/* SEARCH */}
      <input
        className="border px-4 py-2 rounded-lg w-1/3 text-black"
        placeholder="Cari produk..."
      />

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <Link href="/cart" className="relative text-xl">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <div>
              <p className="text-sm text-black">{user.email}</p>
              <p className="text-green-600 font-bold">
                Rp {(user.balance || 0).toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={handleTopUp}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Top Up
            </button>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Daftar</Link>
          </>
        )}
      </div>
    </div>
  );
}