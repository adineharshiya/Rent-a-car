import { differenceInDays } from "date-fns";

export default function RentalDetailsPage({
  car,
  startDate,
  endDate,
  pickupTime,
  pickupLocation,
  dropoffLocation,
  onBack,
}) {
  // محاسبه تعداد روزهای باقی‌مانده تا تاریخ تحویل
  const today = new Date();
  const pickUpDate = new Date(startDate);
  const daysLeft = differenceInDays(pickUpDate, today);

  let dayStatus = "";
  if (daysLeft < 0) {
    dayStatus = "⏳ Pick-up date has passed.";
  } else if (daysLeft === 0) {
    dayStatus = "🚗 Today is the pick-up day!";
  } else if (daysLeft === 1) {
    dayStatus = "⏰ 1 day left until pick-up.";
  } else {
    dayStatus = `📅 ${daysLeft} days left until pick-up.`;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-5 px-5 font-sans relative pb-6">
      {/* هدر با دکمه بازگشت */}
      <div className="flex items-center justify-between mt-2 mb-4 px-1 relative">
        <button
          onClick={onBack}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-900 tracking-tight">
          Rental Status
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col gap-6">
        {/* کارت وضعیت روزهای باقی‌مانده */}
        <div
          className={`p-6 rounded-3xl shadow-sm border ${
            daysLeft < 0
              ? "bg-red-50 border-red-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Pick-up Countdown
          </h2>
          <p className="text-base font-medium text-gray-700">{dayStatus}</p>
        </div>

        {/* اطلاعات ماشین و جزئیات اجاره */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
          {/* بخش ماشین */}
          <div className="flex gap-4 items-center">
            <div className="w-24 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={car.img}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
              <p className="text-sm text-gray-400">{car.model}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-[#2b4eff]">
                ${car.price}
              </span>
              <span className="text-xs text-gray-400 block">/ month</span>
            </div>
          </div>

          {/* خط جداکننده */}
          <div className="w-full h-px bg-gray-200 my-1"></div>

          {/* گرید اطلاعات زمان و مکان */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            {/* تاریخ‌ها */}
            <div>
              <span className="block text-xs text-gray-400">Pick-up Date</span>
              <span className="font-medium text-gray-800">{startDate}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-400">Drop-off Date</span>
              <span className="font-medium text-gray-800">{endDate}</span>
            </div>

            {/* ساعت‌ها */}
            <div>
              <span className="block text-xs text-gray-400">Pick-up Time</span>
              <span className="font-medium text-gray-800">
                {pickupTime || "—"}
              </span>
            </div>
            <div>
              <span className="block text-xs text-gray-400">Drop-off Time</span>
              <span className="font-medium text-gray-800">
                {pickupTime || "—"}
              </span>
            </div>

            {/* مکان‌ها */}
            <div className="col-span-2">
              <span className="block text-xs text-gray-400">
                Pick-up Location
              </span>
              <span className="font-medium text-gray-800 truncate">
                {pickupLocation || "Not specified"}
              </span>
            </div>
            <div className="col-span-2">
              <span className="block text-xs text-gray-400">
                Drop-off Location
              </span>
              <span className="font-medium text-gray-800 truncate">
                {dropoffLocation || "Not specified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
