import { useState } from "react";
import {
  UserIcon,
  PencilSquareIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function AccountPage({ onLogout, onBack }) {
  // اطلاعات کاربر (فعلاً سخت‌افزاری)
  const [user, setUser] = useState({
    name: "Arshia",
    email: "arshia@driveit.com",
  });

  // استیت برای نمایش/عدم نمایش فرم ویرایش
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  });
  const [successMessage, setSuccessMessage] = useState("");

  // هنگام کلیک روی دکمه ویرایش
  const handleEditClick = () => {
    setEditForm({ name: user.name, email: user.email });
    setIsEditing(true);
    setSuccessMessage("");
  };

  // ذخیره تغییرات
  const handleSaveProfile = () => {
    // شبیه‌سازی ذخیره‌سازی در فرانت‌اند
    setUser({ name: editForm.name, email: editForm.email });
    setIsEditing(false);
    setSuccessMessage("✅ Profile updated successfully!");

    // پاک کردن پیام موفقیت بعد از ۳ ثانیه
    setTimeout(() => setSuccessMessage(""), 3000);

    /* 
    =========================================================
    کد واقعی برای اتصال به بک‌اند (وقتی سرور آماده شد):
    =========================================================
    fetch('/api/user/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editForm.name, email: editForm.email }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setUser({ name: editForm.name, email: editForm.email });
        setIsEditing(false);
        setSuccessMessage("✅ Profile updated successfully!");
      } else {
        alert("Error updating profile.");
      }
    })
    .catch(err => console.error(err));
    =========================================================
    */
  };

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
          Account
        </h1>
        <div className="w-10"></div>
      </div>

      {/* پیام موفقیت */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-2xl text-center text-sm font-medium">
          {successMessage}
        </div>
      )}

      {/* --- کارت پروفایل کاربر --- */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-3 mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#2b4eff] to-[#1e3bc4] rounded-full flex items-center justify-center text-white shadow-md">
          <UserIcon className="w-12 h-12" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* --- بخش اصلی (به جای لیست منوهای قدیمی) --- */}
      {!isEditing ? (
        /* حالت مشاهده: یک کارت تمیز برای ویرایش پروفایل */
        <div
          onClick={handleEditClick}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#2b4eff]">
              <PencilSquareIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Edit Profile</p>
              <p className="text-xs text-gray-400">
                Update your name and email
              </p>
            </div>
          </div>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ) : (
        /* حالت ویرایش: فرم ویرایش پروفایل در همان فضا باز می‌شود */
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Name
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-800 outline-none focus:border-[#2b4eff]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Email
              </label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-800 outline-none focus:border-[#2b4eff]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2b4eff] hover:bg-[#1e3bc4] text-white font-bold py-3 rounded-full transition-colors shadow-md mt-2"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* --- دکمه خروج --- */}
      <button
        onClick={onLogout}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-red-50 text-red-500 border border-red-200 rounded-3xl py-4 font-bold text-lg hover:bg-red-100 transition-colors"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
