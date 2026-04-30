"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useCart } from "./context/CartContext";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type User = {
  email: string;
  balance: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, cart, clearCart } = useCart();
  const [user, setUser] = useState<User | null>(null);

  // Ambil user dari localStorage (aman untuk SSR)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
      }
    } catch {
      setUser(null);
    }
  }, []);

  // Total harga (fix type)
  const total = cart.reduce(
    (acc: number, item: Product) => acc + item.price,
    0
  );

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

      const updatedUser: User = {
        email: user.email,
        balance: res?.data?.balance ?? user.balance,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      clearCart();
      alert("Checkout berhasil!");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Checkout gagal");
    }
  };

  // Dummy produk
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Laptop Acer Swift Go 14 9th Gen Intel Core i9-185U",
        price: 10000000,
        image:
          "https://down-id.img.susercontent.com/file/id-11134207-81ztj-mfaxc4cl6tjea4@resize_w900_nl.webp",
      },
      {
        id: 2,
        name: "Razer DeathAdder Essential Mouse",
        price: 200000,
        image:
          "https://i.rtings.com/assets/pages/tTlrZ7Ol/best-razer-mouse-20240320-medium.jpg?format=auto",
      },
      {
        id: 3,
        name: "Razer BlackWidow V3 Keyboard",
        price: 500000,
        image:
          "https://assets2.razerzone.com/images/pnx.assets/5b4b3aa54671b5f65fb35ec272f828a6/razer-blackwidow-v3-hero-mobile-update.webp",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-black">
          🛍️ Daftar Produk
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-black">
                  {item.name}
                </h2>

                <p className="text-blue-600 font-bold mt-1 text-lg">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Beli
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <button
            onClick={handleCheckout}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}