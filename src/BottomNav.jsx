export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <div className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] flex justify-around items-center py-3 px-2 z-20">
      {/* دکمه Rentals (کیف خرید) */}
      <div
        onClick={() => onTabChange("my-rentals")}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors group ${
          activeTab === "my-rentals" ? "text-[#2b4eff]" : "text-gray-400"
        }`}
      >
        <svg
          className="w-7 h-7 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <span className="text-[10px] font-bold">Rentals</span>
      </div>

      {/* دکمه Branches */}
      <div
        onClick={() => onTabChange("branches")}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors group ${
          activeTab === "branches" ? "text-[#2b4eff]" : "text-gray-400"
        }`}
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="text-[10px] font-medium">Branches</span>
      </div>

      {/* دکمه Vehicles (فلش‌ها - صفحه اصلی) */}
      <div
        onClick={() => onTabChange("home")}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors group ${
          activeTab === "home" ? "text-[#2b4eff]" : "text-gray-400"
        }`}
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <span className="text-[10px] font-bold">Vehicles</span>
      </div>

      {/* دکمه Account */}
      <div
        onClick={() => onTabChange("account")}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors group ${
          activeTab === "account" ? "text-[#2b4eff]" : "text-gray-400"
        }`}
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="text-[10px] font-medium">Account</span>
      </div>
    </div>
  );
}
