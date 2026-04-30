"use client";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Login dulu!");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          email: user.email,
          total,
        }
      );

      const updatedUser = { ...user, balance: res.data.balance };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      clearCart();
      alert("Checkout berhasil!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Checkout gagal");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-black mb-6">
          🛒 Keranjang
        </h1>

        {cart.map((item: any, i: number) => (
          <div
            key={i}
            className="bg-white p-4 rounded mb-3 flex justify-between"
          >
            <div>
              <h2 className="text-black font-bold">{item.name}</h2>
              <p className="text-blue-600">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(i)}
              className="bg-red-500 text-white px-3 rounded"
            >
              Hapus
            </button>
          </div>
        ))}

        <div className="bg-white p-4 rounded mt-4">
          <h2 className="text-black font-bold">
            Total: Rp {total.toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={clearCart}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Kosongkan
          </button>

          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}