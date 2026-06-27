import { useState } from "react";

export default function ForgotPassword({ onBack, onResetSuccess }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);

  const handleSendCode = (e) => {
    e.preventDefault();
    setError("");
    if (email.trim() === "") {
      setError("Please enter your email address.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError(
        "Please enter a valid email address (must contain '@' and a domain).",
      );
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setShowCodeModal(true);
  };

  const handleCloseModal = () => {
    setShowCodeModal(false);
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError("");
    if (otp.trim() !== generatedCode) {
      setError("Incorrect verification code. Please try again.");
      return;
    }
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setStep(4);
    setTimeout(() => {
      onResetSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#2b4eff] flex flex-col items-center justify-between py-20 px-6 text-center text-white font-sans relative">
      <button
        onClick={onBack}
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
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 border-[4px] border-white rounded-full flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Reset Password</h2>
        </div>

        <div className="flex gap-2 mb-6 w-full justify-center">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? "w-8 bg-white" : "w-3 bg-white/30"}`}
            ></div>
          ))}
        </div>

        {step === 1 && (
          <form
            onSubmit={handleSendCode}
            noValidate
            className="w-full flex flex-col items-center gap-4"
          >
            <p className="text-sm text-white/70 mb-2">
              Enter your email and we'll send you a verification code.
            </p>
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
            {error && (
              <div className="w-full bg-red-100 border border-red-300 text-red-700 text-sm font-medium py-2 px-4 rounded-2xl text-center shadow-sm animate-pulse">
                ⚠️ {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#222222] hover:bg-black text-white rounded-full py-3 text-lg font-bold transition-transform active:scale-95 shadow-lg mt-2 cursor-pointer"
            >
              Send Code
            </button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleVerifyCode}
            className="w-full flex flex-col items-center gap-4"
          >
            <p className="text-sm text-white/70 mb-2">
              We sent a 6-digit code to your email.
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
              className="w-full bg-white text-gray-900 rounded-full py-3 px-6 text-center font-medium placeholder-gray-400 outline-none tracking-widest"
              maxLength={6}
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
              Verify Code
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-white/60 hover:text-white underline mt-1 cursor-pointer"
            >
              Resend Code
            </button>
          </form>
        )}

        {step === 3 && (
          <form
            onSubmit={handleResetPassword}
            className="w-full flex flex-col items-center gap-4"
          >
            <p className="text-sm text-white/70 mb-2">
              Enter your new password.
            </p>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
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
              Reset Password
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center gap-4 mt-10 animate-pulse">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
              ✓
            </div>
            <h3 className="text-xl font-bold">Password Changed!</h3>
            <p className="text-sm text-white/70">
              You can now login with your new password.
            </p>
          </div>
        )}
      </div>

      {showCodeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl transform transition-all scale-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-[#2b4eff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Verification Code Sent
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                We sent a 6-digit code to{" "}
                <span className="font-bold text-gray-800">{email}</span>.
              </p>
              <div className="bg-[#f0f4ff] text-[#2b4eff] text-3xl font-bold tracking-widest py-4 px-6 rounded-2xl mb-6 border border-blue-100 shadow-inner select-all">
                {generatedCode}
              </div>
              <button
                onClick={handleCloseModal}
                className="w-full bg-[#2b4eff] hover:bg-[#1e3bc4] text-white font-bold py-3 rounded-full transition-colors shadow-md"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-10"></div>
    </div>
  );
}
