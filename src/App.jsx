import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import LoginPage from "./Login";
import ForgotPassword from "./Forgot-pass";
import RegisterPage from "./Register";
import { allCars } from "./carsData";
import CheckoutPage from "./Checkout";
import PaymentPage from "./Payment";
import MyRentalsPage from "./MyRentals";
import RentalDetailsPage from "./RentalDetailsPage";
import BranchesPage from "./BranchesPage";
import AccountPage from "./AccountPage";
import BottomNav from "./BottomNav";

const categoriesData = [
  { name: "Standard", img: allCars[0].img },
  { name: "Prestige", img: allCars[2].img },
  { name: "SUV", img: allCars[4].img },
  { name: "Economy", img: allCars[6].img },
  { name: "Luxury", img: allCars[7].img },
  { name: "Electric", img: allCars[8].img },
  { name: "Sports", img: allCars[10].img },
];

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 pb-24 pt-5 px-5 font-sans relative animate-pulse">
      <div className="w-full h-14 bg-gray-200 rounded-full mb-6"></div>
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-1 px-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="min-w-[110px] h-40 bg-gray-200 rounded-2xl"
          ></div>
        ))}
      </div>
      <div className="w-48 h-5 bg-gray-200 rounded-md mb-6"></div>
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="w-full h-56 bg-gray-200 rounded-3xl"></div>
        ))}
      </div>
      <div className="fixed bottom-6 left-4 right-4 h-16 bg-gray-200 rounded-3xl"></div>
    </div>
  );
}

function CarDetailsPage({
  car,
  onBack,
  onRent,
  onToggleWishlist,
  isWishlisted,
  initialDuration = "monthly",
}) {
  if (!car) return null;

  const [duration, setDuration] = useState(initialDuration);

  const baseMonthly = car.price;
  const dailyPrice = Math.round(baseMonthly / 30);
  const weeklyPrice = Math.round(baseMonthly / 4);

  const currentPrice =
    duration === "daily"
      ? dailyPrice
      : duration === "weekly"
        ? weeklyPrice
        : baseMonthly;
  const durationLabel =
    duration === "daily" ? "day" : duration === "weekly" ? "week" : "month";

  return (
    <div className="min-h-screen bg-gray-100 pt-5 px-5 font-sans relative pb-24">
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
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
        <button
          onClick={() => onToggleWishlist(car)}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
        >
          <svg
            className={`w-6 h-6 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`}
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="w-full h-64 bg-gradient-to-br from-[#F0F4FF] to-transparent rounded-3xl overflow-hidden shadow-sm mb-6 mt-2">
        <img
          src={car.img}
          alt={car.name}
          className="w-full h-full object-cover rounded-3xl drop-shadow-xl transition-transform hover:scale-105 duration-500"
        />
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {car.name}
            </h2>
            <p className="text-sm font-medium text-gray-400">{car.model}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-semibold text-[#2b4eff]">
              ${currentPrice}
            </span>
            <span className="text-xs text-gray-400 block mt-0.5">
              / {durationLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="bg-[#EBF3FF] text-[#2b4eff] text-xs font-bold px-3 py-1.5 rounded-full">
            {car.category}
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4">
            Vehicle Details
          </h3>
          <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-600">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Category</span>
              <span className="font-medium text-gray-800">{car.category}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Engine</span>
              <span className="font-medium text-gray-800">{car.engine}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Transmission</span>
              <span className="font-medium text-gray-800">
                {car.transmission}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Fuel</span>
              <span className="font-medium text-gray-800">{car.fuel}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Horsepower</span>
              <span className="font-medium text-gray-800">
                {car.horsepower} HP
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-4 right-4 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-3xl p-4 z-20 flex flex-col gap-3 border border-white/60">
        <div className="flex justify-between gap-2 mb-1">
          {[
            { id: "daily", label: "Day" },
            { id: "weekly", label: "Week" },
            { id: "monthly", label: "Month" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDuration(opt.id)}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all duration-200 ${duration === opt.id ? "bg-[#2b4eff] text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center px-2 mt-1 border-t border-gray-100 pt-3">
          <span className="text-sm text-gray-500">Total ({durationLabel})</span>
          <span className="text-xl font-bold text-[#2b4eff]">
            ${currentPrice}
          </span>
        </div>
        <button
          onClick={() => onRent(car, duration, currentPrice)}
          className="w-full bg-[#2b4eff] hover:bg-[#1e3bc4] text-white font-bold py-3.5 rounded-full transition-colors shadow-md mt-1"
        >
          Rent Now
        </button>
      </div>
    </div>
  );
}

function HomePage({ onCarSelect, activeTab, onTabChange }) {
  const [selectedCategory, setSelectedCategory] = useState("Standard");
  const [searchTerm, setSearchTerm] = useState("");

  const [globalDuration, setGlobalDuration] = useState("monthly");

  const calculatePrice = (basePrice, duration) => {
    if (duration === "daily") return Math.round(basePrice / 30);
    if (duration === "weekly") return Math.round(basePrice / 4);
    return basePrice;
  };

  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    const newMax = Math.max(
      ...allCars.map((c) => calculatePrice(c.price, globalDuration)),
      10,
    );
    setMaxPrice(newMax);
    setPriceRange((prev) => {
      if (prev[0] === 0 && prev[1] === 0) {
        return [0, newMax];
      }
      let min = prev[0];
      let max = prev[1];
      if (min > newMax) min = 0;
      if (max > newMax) max = newMax;
      return [min, max];
    });
  }, [globalDuration]);

  const categoriesWithCount = categoriesData.map((cat) => ({
    ...cat,
    count: allCars.filter((car) => car.category === cat.name).length,
  }));

  const filteredCars = allCars.filter((car) => {
    const currentCarPrice = calculatePrice(car.price, globalDuration);
    const matchesSearch = car.name
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());
    const matchesPrice =
      currentCarPrice >= priceRange[0] && currentCarPrice <= priceRange[1];

    if (searchTerm.trim() === "") {
      return car.category === selectedCategory && matchesPrice;
    }
    return matchesSearch && matchesPrice;
  });

  const handleMinInput = (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 0 && val < priceRange[1]) {
      setPriceRange([val, priceRange[1]]);
    }
  };
  const handleMaxInput = (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val <= maxPrice && val > priceRange[0]) {
      setPriceRange([priceRange[0], val]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 pt-5 px-5 font-sans relative">
      <div className="bg-white rounded-full p-4 px-6 shadow-md flex justify-between items-center mb-4 border border-gray-200">
        <input
          type="text"
          placeholder="Search for a car"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none w-full bg-transparent text-gray-800 font-medium pl-2 placeholder-gray-400"
        />
        <div className="bg-[#EBF3FF] p-2 rounded-full">
          <svg
            className="w-5 h-5 text-[#2b4eff]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 border border-gray-100 relative z-10">
        <div className="flex justify-between gap-2 mb-4">
          {[
            { id: "daily", label: "Daily" },
            { id: "weekly", label: "Weekly" },
            { id: "monthly", label: "Monthly" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setGlobalDuration(opt.id)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${globalDuration === opt.id ? "bg-[#2b4eff] text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-1 px-2">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Price Range (
            {globalDuration === "daily"
              ? "Day"
              : globalDuration === "weekly"
                ? "Week"
                : "Month"}
            )
          </span>
          <span className="text-xs font-bold text-[#2b4eff]">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>

        <Slider
          range
          min={0}
          max={maxPrice}
          step={1}
          value={priceRange}
          onChange={(val) => setPriceRange(val)}
          className="mb-3 mt-2"
        />

        <div className="flex justify-between items-center gap-4 mt-1 px-1">
          <input
            type="number"
            min={0}
            max={priceRange[1] - 1}
            value={priceRange[0]}
            onChange={handleMinInput}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-center text-sm font-medium text-gray-800 outline-none focus:border-[#2b4eff]"
          />
          <span className="text-gray-400 font-medium">-</span>
          <input
            type="number"
            min={priceRange[0] + 1}
            max={maxPrice}
            value={priceRange[1]}
            onChange={handleMaxInput}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-center text-sm font-medium text-gray-800 outline-none focus:border-[#2b4eff]"
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 custom-scrollbar active:cursor-grabbing cursor-grab overscroll-x-contain">
        {categoriesWithCount.map((cat, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(cat.name)}
            className={`min-w-[110px] rounded-2xl p-4 flex flex-col items-center relative shadow-md transition-all duration-200 cursor-pointer touch-pan-x ${selectedCategory === cat.name ? "bg-white border-2 border-[#2b4eff] shadow-lg" : "bg-white border border-gray-200 shadow-sm"}`}
          >
            <div className="w-full h-16 bg-white rounded-3xl flex items-center justify-center mb-3 overflow-hidden">
              <img
                src={cat.img}
                alt={cat.name}
                className="h-full w-full object-contain rounded-3xl drop-shadow-xl transition-transform md:hover:scale-105 duration-500"
              />
            </div>
            <span
              className={`text-sm font-bold ${selectedCategory === cat.name ? "text-[#2b4eff]" : "text-gray-800"}`}
            >
              {cat.name}
            </span>
            <span
              className={`text-xs font-light ${selectedCategory === cat.name ? "text-[#2b4eff]" : "text-gray-500"}`}
            >
              {cat.count}
            </span>
          </div>
        ))}
      </div>

      <h3 className="text-gray-500 font-bold tracking-wider text-sm uppercase mt-4 mb-6">
        {selectedCategory} Vehicles
      </h3>

      <div className="flex flex-col gap-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => {
            const availableCount =
              car.inStock === false
                ? 0
                : allCars.filter((c) => c.name === car.name).length;
            const isAvailable = availableCount > 0;
            const dynamicPrice = calculatePrice(car.price, globalDuration);
            const durationLabel =
              globalDuration === "daily"
                ? "day"
                : globalDuration === "weekly"
                  ? "week"
                  : "month";

            return (
              <div
                key={car.id}
                onClick={() => {
                  if (isAvailable) onCarSelect(car, globalDuration);
                }}
                className={`bg-white rounded-3xl p-6 shadow-lg md:hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-gray-100 ${isAvailable ? "cursor-pointer" : "opacity-50 cursor-not-allowed grayscale-[30%]"}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      {car.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-400">
                        {car.model}
                      </p>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isAvailable ? (availableCount === 1 ? "text-red-500 bg-red-50 animate-pulse" : "text-green-600 bg-green-50") : "bg-white text-gray-800 border border-gray-300"}`}
                      >
                        {isAvailable
                          ? availableCount === 1
                            ? "1 left"
                            : `${availableCount} available`
                          : "Not available"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-semibold text-[#2b4eff]">
                      ${dynamicPrice}
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      / {durationLabel}
                    </span>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200 mb-3"></div>
                <div className="w-full h-48 bg-gradient-to-br from-[#F0F4FF] to-transparent rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover rounded-2xl drop-shadow-xl transition-transform md:hover:scale-105 duration-500"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-10 font-medium">
            No cars found matching this price!
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}

function App() {
  const [view, setView] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);
  const [rentalDuration, setRentalDuration] = useState("");
  const [rentalPrice, setRentalPrice] = useState(0);
  const [rentalDates, setRentalDates] = useState({
    startDate: "",
    endDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropoffLocation: "",
  });
  const [wishlistedCars, setWishlistedCars] = useState([]);
  const [rentedCars, setRentedCars] = useState([]);
  const [expiredCars, setExpiredCars] = useState([]);
  const [detailsDuration, setDetailsDuration] = useState("monthly");

  const handleLoginSuccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView("home");
    }, 1500);
  };
  const handleForgotClick = () => setView("forgot");
  const handleBackToLogin = () => setView("login");
  const handleResetSuccess = () => setView("login");
  const handleRegisterClick = () => setView("register");
  const handleBackToLoginFromRegister = () => setView("login");
  const handleRegisterSuccess = () => setView("login");

  const handleToggleWishlist = (car) => {
    setWishlistedCars((prev) => {
      const isAlreadyWishlisted = prev.some((c) => c.id === car.id);
      return isAlreadyWishlisted
        ? prev.filter((c) => c.id !== car.id)
        : [...prev, car];
    });
  };

  const handleRentCar = (car, duration, price) => {
    setSelectedCar(car);
    setRentalDuration(duration);
    setRentalPrice(price);
    setView("checkout");
  };

  const handlePaymentComplete = () => {
    const rentedCarData = {
      ...selectedCar,
      startDate: rentalDates.startDate,
      endDate: rentalDates.endDate,
      pickupTime: rentalDates.pickupTime,
      pickupLocation: rentalDates.pickupLocation,
      dropoffLocation: rentalDates.dropoffLocation,
    };
    setRentedCars((prev) => {
      const isAlreadyRented = prev.some((c) => c.id === rentedCarData.id);
      return !isAlreadyRented ? [...prev, rentedCarData] : prev;
    });
    setTimeout(() => setView("home"), 500);
  };

  const handleCarSelect = (car, duration = "monthly") => {
    setSelectedCar(car);
    setDetailsDuration(duration);
    if (car.startDate) {
      setView("rental-details");
    } else {
      setView("details");
    }
  };

  const handleBackToHome = () => setView("home");
  const handleBackToDetails = () => setView("details");
  const handleProceedToPayment = (details) => {
    setRentalDates({
      startDate: details.startDate,
      endDate: details.endDate,
      pickupTime: details.pickupTime,
      pickupLocation: details.pickupLocation,
      dropoffLocation: details.dropoffLocation,
    });
    setView("payment");
  };
  const handleBackToCheckout = () => setView("checkout");
  const handleGoToMyRentals = () => setView("my-rentals");
  const handleBackFromMyRentals = () => setView("home");

  // هندلرهای جدید برای صفحه Branches
  const handleGoToBranches = () => setView("branches");
  const handleBackFromBranches = () => setView("home");

  // هندلرهای جدید برای صفحه Account
  const handleBackFromAccount = () => setView("home");
  const handleLogout = () => setView("login");

  const handleTabChange = (tab) => {
    if (tab === "home") setView("home");
    else if (tab === "my-rentals") setView("my-rentals");
    else if (tab === "branches")
      setView("branches"); // اضافه شد
    else if (tab === "account") setView("account");
  };

  const isCarWishlisted = (car) => wishlistedCars.some((c) => c.id === car.id);

  useEffect(() => {
    if (view !== "my-rentals") return;

    const today = new Date();
    const activeRentals = [];
    const expired = [];

    rentedCars.forEach((car) => {
      if (!car.endDate) {
        activeRentals.push(car);
      } else {
        const endDate = new Date(car.endDate);
        if (endDate >= today) {
          activeRentals.push(car);
        } else {
          expired.push(car);
        }
      }
    });

    if (activeRentals.length !== rentedCars.length) {
      setRentedCars(activeRentals);
    }

    if (expired.length > 0) {
      setExpiredCars((prev) => {
        const combined = [...prev, ...expired];
        const uniqueIds = new Set();
        return combined.filter((car) => {
          if (!uniqueIds.has(car.id)) {
            uniqueIds.add(car.id);
            return true;
          }
          return false;
        });
      });
    }
  }, [view, rentedCars]);

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="bg-gray-100 w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-[#f4f6f8] shadow-2xl min-h-screen overflow-hidden relative flex flex-col">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div
                key="login"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <LoginPage
                  onLogin={handleLoginSuccess}
                  onForgot={handleForgotClick}
                  onRegister={handleRegisterClick}
                />
              </motion.div>
            )}
            {view === "forgot" && (
              <motion.div
                key="forgot"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <ForgotPassword
                  onBack={handleBackToLogin}
                  onResetSuccess={handleResetSuccess}
                />
              </motion.div>
            )}
            {view === "register" && (
              <motion.div
                key="register"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <RegisterPage
                  onBackToLogin={handleBackToLoginFromRegister}
                  onRegister={handleRegisterSuccess}
                />
              </motion.div>
            )}
            {view === "home" && (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <HomePage
                  onCarSelect={handleCarSelect}
                  activeTab="home"
                  onTabChange={handleTabChange}
                />
              </motion.div>
            )}
            {view === "details" && (
              <motion.div
                key="details"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <CarDetailsPage
                  car={selectedCar}
                  onBack={handleBackToHome}
                  onRent={handleRentCar}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={isCarWishlisted(selectedCar)}
                  initialDuration={detailsDuration}
                />
              </motion.div>
            )}
            {view === "checkout" && (
              <motion.div
                key="checkout"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <CheckoutPage
                  car={selectedCar}
                  duration={rentalDuration}
                  price={rentalPrice}
                  onBack={handleBackToDetails}
                  onProceedToPayment={handleProceedToPayment}
                />
              </motion.div>
            )}
            {view === "payment" && (
              <motion.div
                key="payment"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <PaymentPage
                  car={selectedCar}
                  price={rentalPrice}
                  duration={rentalDuration}
                  dates={rentalDates}
                  pickupTime={rentalDates.pickupTime}
                  pickupLocation={rentalDates.pickupLocation}
                  dropoffLocation={rentalDates.dropoffLocation}
                  onBack={handleBackToCheckout}
                  onPaymentComplete={handlePaymentComplete}
                />
              </motion.div>
            )}
            {view === "my-rentals" && (
              <motion.div
                key="my-rentals"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <MyRentalsPage
                  rentedCars={rentedCars}
                  wishlistedCars={wishlistedCars}
                  expiredCars={expiredCars}
                  onCarSelect={handleCarSelect}
                  activeTab="my-rentals"
                  onTabChange={handleTabChange}
                />
              </motion.div>
            )}
            {view === "rental-details" && (
              <motion.div
                key="rental-details"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <RentalDetailsPage
                  car={selectedCar}
                  startDate={selectedCar.startDate}
                  endDate={selectedCar.endDate}
                  pickupTime={selectedCar.pickupTime}
                  pickupLocation={selectedCar.pickupLocation}
                  dropoffLocation={selectedCar.dropoffLocation}
                  onBack={handleBackToHome}
                />
              </motion.div>
            )}
            {view === "branches" && (
              <motion.div
                key="branches"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <BranchesPage onBack={handleBackFromBranches} />
              </motion.div>
            )}
            {view === "account" && (
              <motion.div
                key="account"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <AccountPage
                  onLogout={handleLogout}
                  onBack={handleBackFromAccount}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default App;
