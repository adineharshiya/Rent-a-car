import { useState } from "react";
import BottomNav from "./BottomNav";

export default function MyRentalsPage({
  rentedCars,
  wishlistedCars,
  expiredCars, // پراپ جدید دریافت می‌شود
  onCarSelect,
  activeTab,
  onTabChange,
}) {
  const [activeTabLocal, setActiveTabLocal] = useState("rented");

  return (
    <div className="min-h-screen bg-gray-100 pt-5 px-5 font-sans relative pb-28">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">
        My Rentals
      </h1>

      {/* تب‌های انتخابگر (حالا ۳ تایی) */}
      <div className="flex gap-4 mb-6 bg-white p-1 rounded-full shadow-sm border border-gray-100">
        <button
          onClick={() => setActiveTabLocal("rented")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-200 ${
            activeTabLocal === "rented"
              ? "bg-[#2b4eff] text-white shadow-md"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          Rented ({rentedCars.length})
        </button>
        <button
          onClick={() => setActiveTabLocal("saved")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-200 ${
            activeTabLocal === "saved"
              ? "bg-[#2b4eff] text-white shadow-md"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          Saved ({wishlistedCars.length})
        </button>
        {expiredCars.length > 0 && (
          <button
            onClick={() => setActiveTabLocal("expired")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-200 ${
              activeTabLocal === "expired"
                ? "bg-[#2b4eff] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Expired ({expiredCars.length})
          </button>
        )}
      </div>

      {/* --- نمایش لیست ماشین‌ها --- */}
      <div className="flex flex-col gap-4">
        {/* لیست ماشین‌های اجاره شده (Rented) */}
        {activeTabLocal === "rented" && (
          <>
            {rentedCars.length > 0 ? (
              rentedCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => onCarSelect(car)}
                  className="bg-white rounded-3xl p-4 shadow-md border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="w-20 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={car.img}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {car.name}
                    </h3>
                    <p className="text-xs text-gray-400">{car.model}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#2b4eff]">
                      ${car.price}
                    </span>
                    <span className="text-xs text-gray-400 block">/ month</span>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full">
                      Rented
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10 font-medium">
                You haven't rented any cars yet.
              </div>
            )}
          </>
        )}

        {/* لیست ماشین‌های ذخیره شده (Saved) */}
        {activeTabLocal === "saved" && (
          <>
            {wishlistedCars.length > 0 ? (
              wishlistedCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => onCarSelect(car)}
                  className="bg-white rounded-3xl p-4 shadow-md border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="w-20 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={car.img}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {car.name}
                    </h3>
                    <p className="text-xs text-gray-400">{car.model}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#2b4eff]">
                      ${car.price}
                    </span>
                    <span className="text-xs text-gray-400 block">/ month</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10 font-medium">
                You haven't saved any cars yet. Tap the heart icon!
              </div>
            )}
          </>
        )}

        {/* --- لیست ماشین‌های منقضی‌شده (Expired) --- */}
        {activeTabLocal === "expired" && (
          <>
            {expiredCars.length > 0 ? (
              expiredCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => onCarSelect(car)}
                  className="bg-white rounded-3xl p-4 shadow-md border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="w-20 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={car.img}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {car.name}
                    </h3>
                    <p className="text-xs text-gray-400">{car.model}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-400">
                      ${car.price}
                    </span>
                    <span className="text-xs text-gray-400 block">/ month</span>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-200 text-gray-500 text-[10px] font-bold rounded-full">
                      Expired
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10 font-medium">
                No expired rentals found.
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
