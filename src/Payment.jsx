import { useState } from "react";
import { format } from "date-fns";

export default function PaymentPage({
  car,
  price,
  duration,
  dates,
  pickupTime,
  pickupLocation,
  dropoffLocation,
  onBack,
  onPaymentComplete,
}) {
  const [selectedPayment, setSelectedPayment] = useState(null); // استیت برای انتخاب درگاه
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // --- فرمت‌دهی زمان ---
  let formattedTime = "—";
  if (pickupTime && pickupTime !== "") {
    try {
      formattedTime = format(new Date(`2000-01-01T${pickupTime}`), "hh:mm a");
    } catch (e) {
      formattedTime = pickupTime;
    }
  }

  // --- پردازش نهایی رزرو ---
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    
    // اگر روش پرداختی انتخاب نشده باشد، می‌توانید یک هشدار بدهید (اختیاری)
    // اما چون دکمه آبی صرفاً برای تایید رزرو است و لینک واقعی نداریم، اجازه می‌دهیم کار کند.

    // شبیه‌سازی پرداخت موفق
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 500);
  };

  // --- بستن مودال و رفتن به خانه ---
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onPaymentComplete(); // ماشین به لیست رنت‌شده اضافه می‌شود
  };

  let start = new Date(dates.startDate);
  let end = new Date(dates.endDate);
  if (start > end) [start, end] = [end, start];

  const formattedStartDate = format(start, "MMM dd, yyyy");
  const formattedEndDate = format(end, "MMM dd, yyyy");

  return (
    <div className="min-h-screen bg-gray-100 pt-5 px-5 font-sans relative pb-28">
      <div className="flex items-center justify-between mt-2 mb-4 px-1 relative">
        <button
          onClick={onBack}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-900 tracking-tight">
          Payment
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="mt-2 flex flex-col gap-6">
        {/* --- خلاصه فاکتور --- */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">{car.name} {car.model}</span>
            <span className="font-medium text-gray-800 text-sm">${price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Duration</span>
            <span className="font-medium text-gray-800 text-sm capitalize">{duration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Pick-up Time</span>
            <span className="font-medium text-gray-800 text-sm">{formattedTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Drop-off Time</span>
            <span className="font-medium text-gray-800 text-sm">{formattedTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Pick-up Location</span>
            <span className="font-medium text-gray-800 text-sm text-right">{pickupLocation || "Not specified"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Drop-off Location</span>
            <span className="font-medium text-gray-800 text-sm text-right">{dropoffLocation || "Not specified"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Dates</span>
            <span className="font-medium text-gray-800 text-sm">{formattedStartDate} → {formattedEndDate}</span>
          </div>
          <div className="w-full h-px bg-gray-200 my-1"></div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900 text-base">Total</span>
            <span className="text-2xl font-bold text-[#2b4eff]">${price}</span>
          </div>
        </div>

        {/* --- انتخاب درگاه (3 گزینه کاملاً تعاملی) --- */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Select Payment Method</h3>
          <div className="flex flex-col gap-3">
            
            {/* دکمه‌های انتخاب درگاه */}
            <div className="flex gap-3">
              {[
                { id: 'paypal', label: 'PayPal', color: 'bg-[#003087]' },
                { id: 'stripe', label: 'Stripe', color: 'bg-[#635bff]' },
                { id: 'google-pay', label: 'Google Pay', color: 'bg-[#4285f4]' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedPayment(opt.id)}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                    selectedPayment === opt.id
                      ? `${opt.color} text-white shadow-md ring-2 ring-offset-2 ring-[#2b4eff]`
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* 
              کد واقعی برای زمانی که لینک‌ها را دارید (فعلاً کامنت است):
              
              {selectedPayment === 'paypal' && (
                <a href="YOUR_PAYPAL_LINK" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#003087] hover:bg-[#002266] text-white font-bold py-3 rounded-xl text-center transition-colors mt-2">
                  Proceed with PayPal
                </a>
              )}
              ... (برای سایر درگاه‌ها)
            */}

            <p className="text-[10px] text-gray-400 text-center mt-1">
              {selectedPayment ? `You selected: ${selectedPayment.toUpperCase()}` : "Select a payment method above"}
            </p>
          </div>
        </div>
      </div>

      {/* --- دکمه آبی پایین (تایید نهایی) --- */}
      <div className="fixed bottom-6 left-4 right-4 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-3xl p-4 z-20 flex flex-col gap-3 border border-white/60">
        <button
          type="button"
          onClick={handleConfirmBooking}
          className="w-full bg-[#2b4eff] hover:bg-[#1e3bc4] text-white font-bold py-3.5 rounded-full transition-colors shadow-md text-lg"
        >
          Confirm Booking
        </button>
      </div>

      {/* =================================================== */}
      {/* مودال موفقیت (به جای Alert) */}
      {/* =================================================== */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl transform transition-all scale-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Booking Confirmed!</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your <span className="font-bold text-gray-800">{car.name} {car.model}</span> has been successfully rented.
            </p>
            <button
              onClick={handleSuccessClose}
              className="w-full bg-[#2b4eff] hover:bg-[#1e3bc4] text-white font-bold py-3 rounded-full transition-colors shadow-md"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}