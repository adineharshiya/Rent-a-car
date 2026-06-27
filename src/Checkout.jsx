import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

// ایمپورت‌های Leaflet
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// اصلاح آیکون پیش‌فرض Leaflet
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// کامپوننت داخلی برای مدیریت کلیک روی نقشه
function MapClickHandler({ setPosition, setAddress }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      setAddress("Fetching address...");

      const urlList = [
        `https://iran.openstreetmap.org/nominatim/reverse?lat=${lat}&lon=${lng}&format=json`,
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&format=json`,
      ];

      let finalAddress = `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

      for (const url of urlList) {
        try {
          const response = await fetch(url, {
            headers: {
              Accept: "application/json",
              "User-Agent": "DriveItApp",
              "Accept-Language": "en",
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data && data.display_name) {
              finalAddress = data.display_name;
              break;
            }
          }
        } catch (err) {
          console.warn(`Error with server ${url}:`, err.message);
        }
      }

      setAddress(finalAddress);
    },
  });
  return null;
}

export default function CheckoutPage({
  car,
  duration,
  price,
  onBack,
  onProceedToPayment,
}) {
  const [pickupDate, setPickupDate] = useState(undefined);
  const [pickupLocation, setPickupLocation] = useState("");
  const [error, setError] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [position, setPosition] = useState({ lat: 35.6892, lng: 51.389 });

  // --- استیت‌های جدید برای ساعت زیبا ---
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("PM");
  const [isHourOpen, setIsHourOpen] = useState(false);
  const [isMinuteOpen, setIsMinuteOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const timePickerRef = useRef(null);

  // --- استیت‌های جدید برای مکان بازگشت (Drop-off) ---
  const [dropoffOption, setDropoffOption] = useState("same");
  const [dropoffAddress, setDropoffAddress] = useState("");

  const branchAddresses = {
    same: pickupLocation || "Same as pick-up location",
    central: "Central Branch, Downtown Avenue, Tehran",
    west: "West Branch, Western District Blvd, Tehran",
    east: "East Branch, Eastern Highway, Tehran",
  };

  const handleDropoffChange = (option) => {
    setDropoffOption(option);
    if (option === "same") {
      setDropoffAddress(pickupLocation || "Same as pick-up location");
    } else {
      setDropoffAddress(branchAddresses[option]);
    }
  };

  const datePickerRef = useRef(null);
  const buttonRef = useRef(null);

  // --- بستن منوها با کلیک بیرون ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsDatePickerOpen(false);
      }
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target)
      ) {
        setIsHourOpen(false);
        setIsMinuteOpen(false);
        setIsPeriodOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hoursArray = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
  const minutesArray = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const calculateDropoffDate = (startDate, dur) => {
    if (!startDate) return undefined;
    const end = new Date(startDate);
    if (dur === "daily") end.setDate(end.getDate() + 1);
    else if (dur === "weekly") end.setDate(end.getDate() + 7);
    else if (dur === "monthly") end.setDate(end.getDate() + 30);
    return end;
  };

  const calculatedDropoffDate = calculateDropoffDate(pickupDate, duration);

  const handleDateSelect = (date) => {
    if (date) {
      setPickupDate(date);
      setIsDatePickerOpen(false);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!pickupDate) {
      setError("Please select a pick-up date.");
      return;
    }
    if (!pickupLocation.trim()) {
      setError("Please enter an address or click on the map.");
      return;
    }

    let h = parseInt(hour);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    const timeString = `${h.toString().padStart(2, "0")}:${minute}`;

    onProceedToPayment({
      startDate: format(pickupDate, "yyyy-MM-dd"),
      endDate: format(calculatedDropoffDate, "yyyy-MM-dd"),
      pickupTime: timeString,
      pickupLocation,
      dropoffLocation: dropoffAddress,
    });
  };

  const dayPickerStyle = {
    "--rdp-accent-color": "#2b4eff",
    "--rdp-background-color": "#EBF3FF",
    "--rdp-selected-border": "none",
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-5 px-5 font-sans relative pb-6">
      <div className="flex flex-col gap-6">
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
            Rental Details
          </h1>
          <div className="w-10"></div>
        </div>

        {/* --- دیو سفید یکپارچه --- */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-5 pb-8">
          <h3 className="text-sm font-bold text-gray-800 mb-1">
            Pick-up Details
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 relative"
          >
            {/* --- تاریخ --- */}
            <div className="relative w-full">
              <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className={`w-full bg-gray-50 border-2 rounded-xl p-4 text-left transition-all duration-200 ${pickupDate ? "border-[#2b4eff]" : "border-gray-200"}`}
              >
                <span className="block text-xs text-gray-500 font-medium">
                  Pick-up Date
                </span>
                <span className="block text-gray-800 font-medium mt-1">
                  {pickupDate ? format(pickupDate, "PPP") : "Select a date"}
                </span>
              </button>

              {isDatePickerOpen && (
                <div
                  ref={datePickerRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-50 w-full flex justify-center pointer-events-auto"
                >
                  <DayPicker
                    mode="single"
                    selected={pickupDate}
                    onSelect={handleDateSelect}
                    style={dayPickerStyle}
                    disabled={{ before: new Date() }} // <--- این خط اضافه شد!
                  />
                </div>
              )}
            </div>

            {/* --- ساعت --- */}
            <div className="relative w-full" ref={timePickerRef}>
              <label className="block text-xs text-gray-500 font-medium mb-1 ml-1">
                Pick-up Time
              </label>
              <div className="flex gap-2 w-full items-center">
                {/* ۱. انتخاب ساعت */}
                <div className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsHourOpen(!isHourOpen);
                      setIsMinuteOpen(false);
                      setIsPeriodOpen(false);
                    }}
                    className={`w-full bg-gray-50 border-2 rounded-xl py-4 text-center text-gray-800 font-medium outline-none transition-colors ${isHourOpen ? "border-[#2b4eff]" : "border-gray-200"}`}
                  >
                    {hour}
                  </button>
                  {isHourOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-30 max-h-40 overflow-y-auto custom-scrollbar p-1">
                      {hoursArray.map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => {
                            setHour(h);
                            setIsHourOpen(false);
                          }}
                          className={`w-full py-2 text-center text-sm font-medium rounded-lg transition-colors ${hour === h ? "bg-[#EBF3FF] text-[#2b4eff]" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-xl font-bold text-gray-400">:</span>

                {/* ۲. انتخاب دقیقه */}
                <div className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMinuteOpen(!isMinuteOpen);
                      setIsHourOpen(false);
                      setIsPeriodOpen(false);
                    }}
                    className={`w-full bg-gray-50 border-2 rounded-xl py-4 text-center text-gray-800 font-medium outline-none transition-colors ${isMinuteOpen ? "border-[#2b4eff]" : "border-gray-200"}`}
                  >
                    {minute}
                  </button>
                  {isMinuteOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-30 max-h-40 overflow-y-auto custom-scrollbar p-1">
                      {minutesArray.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => {
                            setMinute(m);
                            setIsMinuteOpen(false);
                          }}
                          className={`w-full py-2 text-center text-sm font-medium rounded-lg transition-colors ${minute === m ? "bg-[#EBF3FF] text-[#2b4eff]" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ۳. انتخاب AM/PM */}
                <div className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPeriodOpen(!isPeriodOpen);
                      setIsHourOpen(false);
                      setIsMinuteOpen(false);
                    }}
                    className={`w-full bg-gray-50 border-2 rounded-xl py-4 text-center text-gray-800 font-medium outline-none transition-colors ${isPeriodOpen ? "border-[#2b4eff]" : "border-gray-200"}`}
                  >
                    {period}
                  </button>
                  {isPeriodOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-30 p-1">
                      {["AM", "PM"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setPeriod(p);
                            setIsPeriodOpen(false);
                          }}
                          className={`w-full py-2 text-center text-sm font-medium rounded-lg transition-colors ${period === p ? "bg-[#EBF3FF] text-[#2b4eff]" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* --- مکان --- */}
            <div className="relative w-full">
              <label className="block text-xs text-gray-500 font-medium mb-1 ml-1">
                Pick-up Location
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Type address or tap on map..."
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-gray-800 font-medium outline-none focus:border-[#2b4eff]"
                />
              </div>

              {!isDatePickerOpen &&
                !isHourOpen &&
                !isMinuteOpen &&
                !isPeriodOpen && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 shadow-sm h-48 w-full z-0">
                    <MapContainer
                      center={position}
                      zoom={14}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={position} />
                      <MapClickHandler
                        setPosition={setPosition}
                        setAddress={setPickupLocation}
                      />
                    </MapContainer>
                  </div>
                )}
              <p className="text-[10px] text-gray-400 mt-2">
                Tap anywhere on the map to select your pick-up point.
              </p>
            </div>

            {/* --- تاریخ پایان و ساعت بازگشت --- */}
            <div className="relative w-full">
              <div className="w-full bg-gray-200 border-2 border-gray-200 rounded-xl p-4 text-left cursor-not-allowed">
                <span className="block text-xs text-gray-500 font-medium">
                  Drop-off Date & Time (Auto-calculated)
                </span>
                <span className="block text-gray-500 font-medium mt-1">
                  {calculatedDropoffDate && hour && minute && period
                    ? `${format(calculatedDropoffDate, "PPP")} at ${hour}:${minute} ${period}`
                    : "Select pick-up date first"}
                </span>
              </div>
            </div>

            {/* --- مکان بازگشت --- */}
            <div className="relative w-full">
              <span className="block text-xs font-bold text-gray-800 mb-2">
                Drop-off Location
              </span>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {[
                  { id: "same", label: "Same as Pickup" },
                  { id: "central", label: "Central Branch" },
                  { id: "west", label: "West Branch" },
                  { id: "east", label: "East Branch" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      handleDropoffChange(opt.id);
                      if (opt.id === "same" && pickupLocation) {
                        setDropoffAddress(pickupLocation);
                      }
                    }}
                    className={`py-2 px-1 text-xs font-medium rounded-xl border-2 transition-colors text-center ${dropoffOption === opt.id ? "border-[#2b4eff] bg-[#EBF3FF] text-[#2b4eff]" : "border-gray-200 bg-gray-50 text-gray-800"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-1 text-xs text-gray-600 border border-gray-200 bg-gray-50 rounded-lg p-3 text-center min-h-[40px] flex items-center justify-center">
                {dropoffAddress ||
                  (dropoffOption === "same"
                    ? "Select a pick-up location first"
                    : "Select a branch above")}
              </div>
            </div>

            {/* --- فضای خالی (کاهش یافته به h-4) --- */}
            <div className="h-4 w-full"></div>

            {error && (
              <div className="w-full bg-red-100 border border-red-300 text-red-700 text-sm font-medium py-3 px-4 rounded-2xl text-center shadow-sm animate-pulse mt-1">
                ⚠️ {error}
              </div>
            )}

            {/* --- منوی پایین --- */}
            <div className="pt-4 border-t border-gray-100 -mx-6 px-6 pb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-xl font-bold text-[#2b4eff]">
                  ${price}
                </span>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-[#2b4eff] hover:bg-[#1e3bc4] text-white font-bold py-3.5 rounded-full transition-colors shadow-md"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
