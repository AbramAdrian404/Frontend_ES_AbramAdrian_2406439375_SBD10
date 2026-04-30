"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useCart } from "./context/CartContext";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();
  const [user, setUser] = useState<any>(null);

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

useEffect(() => {
  const stored = localStorage.getItem("user");
  if (stored) setUser(JSON.parse(stored));
}, []);

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
        name: "Razer Death Adder Essential Mouse",
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

        {/*JUDUL*/}
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000", opacity: 1 }}
        >
          🛍️ Daftar Produk
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">

                {/*NAMA PRODUK*/}
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "#000", opacity: 1 }}
                >
                  {item.name}
                </h2>

                <p className="text-blue-600 font-bold mt-1 text-lg">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:scale-105 transition"
                >
                  Beli
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}