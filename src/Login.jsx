import { useState } from "react";

export default function LoginPage({ onLogin, onForgot, onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter username and password!");
      return;
    }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#2b4eff] flex flex-col items-center justify-between py-20 px-6 text-center text-white font-sans">
      <div className="flex flex-col items-center mt-8">
        <div className="relative mb-6 flex flex-col items-center">
          <div className="w-24 h-24 border-[6px] border-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <div
            className="w-6 h-6 bg-white absolute -bottom-3"
            style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
          ></div>
        </div>
        <h1 className="text-5xl font-bold tracking-tight">driveit</h1>
      </div>

      {/* فواصل فرم‌ها به gap-4 استاندارد شد */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col items-center gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          className="w-full bg-white text-gray-900 rounded-full py-4 px-6 text-center font-medium placeholder-gray-400 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="w-full bg-white text-gray-900 rounded-full py-4 px-6 text-center font-medium placeholder-gray-400 outline-none"
        />

        {error && (
          <div className="w-full bg-red-100 border border-red-300 text-red-700 text-sm font-medium py-3 px-4 rounded-2xl text-center shadow-sm animate-pulse mt-1">
            ⚠️ {error}
          </div>
        )}

        <button
          type="button"
          onClick={() => onForgot && onForgot()}
          className="text-sm font-medium text-white/80 hover:text-white transition-colors mt-1 cursor-pointer"
        >
          Forgot Password
        </button>

        <button
          type="submit"
          className="w-full bg-[#222222] hover:bg-black text-white rounded-full py-4 text-lg font-bold transition-transform active:scale-95 shadow-lg mt-2 cursor-pointer"
        >
          LOG IN
        </button>

        <button
          type="button"
          onClick={() => onRegister && onRegister()}
          className="text-sm font-medium text-white/80 hover:text-white transition-colors mt-3 cursor-pointer"
        >
          Don't have an account?{" "}
          <span className="font-bold underline">Register</span>
        </button>
      </form>

      <div className="h-10"></div>
    </div>
  );
}
