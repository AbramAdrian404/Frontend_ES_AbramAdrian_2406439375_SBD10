"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Laptop Acer Swift Go 14 i9",
        price: 10000000,
        image:
          "https://down-id.img.susercontent.com/file/id-11134207-81ztj-mfaxc4cl6tjea4@resize_w900_nl.webp",
      },
      {
        id: 2,
        name: "Razer DeathAdder Mouse",
        price: 200000,
        image:
          "https://i.rtings.com/assets/pages/tTlrZ7Ol/best-razer-mouse-20240320-medium.jpg",
      },
      {
        id: 3,
        name: "Razer BlackWidow Keyboard",
        price: 500000,
        image:
          "https://assets2.razerzone.com/images/pnx.assets/5b4b3aa54671b5f65fb35ec272f828a6/razer-blackwidow-v3-hero-mobile-update.webp",
      },
    ]);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-black mb-6">
          🛍️ Daftar Produk
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4">

              <img src={item.image} className="h-44 w-full object-cover rounded" />

              <h2 className="text-lg font-bold text-black mt-2">
                {item.name}
              </h2>

              <p className="text-blue-600 font-bold">
                Rp {item.price.toLocaleString("id-ID")}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
              >
                Beli
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}