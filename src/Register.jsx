import { useState } from "react";

export default function RegisterPage({ onRegister, onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onRegister();
  };

  return (
    <div className="min-h-screen bg-[#2b4eff] flex flex-col items-center justify-between py-20 px-6 text-center text-white font-sans relative">
      <button
        onClick={onBackToLogin}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors cursor-pointer"
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

      <div className="w-full max-w-sm flex flex-col items-center mt-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 border-[4px] border-white rounded-full flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Create Account</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full flex flex-col items-center gap-4"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="w-full bg-white text-gray-900 rounded-full py-3 px-6 text-center font-medium placeholder-gray-400 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full bg-white text-gray-900 rounded-full py-3 px-6 text-center font-medium placeholder-gray-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full bg-white text-gray-900 rounded-full py-3 px-6 text-center font-medium placeholder-gray-400 outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            className="w-full bg-white text-gray-900 rounded-full py-3 px-6 text-center font-medium placeholder-gray-400 outline-none"
          />

          {error && (
            <div className="w-full bg-red-100 border border-red-300 text-red-700 text-sm font-medium py-2 px-4 rounded-2xl text-center shadow-sm animate-pulse">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#222222] hover:bg-black text-white rounded-full py-3 text-lg font-bold transition-transform active:scale-95 shadow-lg mt-2 cursor-pointer"
          >
            SIGN UP
          </button>

          <button
            type="button"
            onClick={onBackToLogin}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors mt-2 cursor-pointer"
          >
            Already have an account? Log In
          </button>
        </form>
      </div>

      <div className="h-10"></div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl transform transition-all scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Welcome, {username}!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Your account has been created successfully. You can now log in
                with your credentials.
              </p>
              <button
                onClick={handleSuccessClose}
                className="w-full bg-[#2b4eff] hover:bg-[#1e3bc4] text-white font-bold py-3 rounded-full transition-colors shadow-md"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
