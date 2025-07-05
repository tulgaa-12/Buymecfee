"use client";
import { useState } from "react";

export const BuyCoffee = () => {
  const [amount, setAmount] = useState(5);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  return (
    <section className="h-[509px] col-span-2 bg-white rounded-lg p-6 shadow">
      <h2 className="font-bold text-xl mb-6">Buy Jake a Coffee</h2>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select amount:</label>
        <div className="flex space-x-3">
          {[1, 2, 5, 10].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`px-4 py-2 rounded-md border ${
                amount === val
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-gray-200 border-transparent"
              }`}>
              ☕ ${val}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Enter BuyMeCoffee or social account URL:
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="buymeacoffee.com/"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Special message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please write your message here"
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </div>

      <button className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition">
        Support
      </button>
    </section>
  );
};
