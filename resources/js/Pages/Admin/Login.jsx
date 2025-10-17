import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "../../Components/Elements/Input";
import Button from "../../Components/Elements/Button";
import schoolLogo from "../../../../public/img/stemba.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // ✅ useForm setup
  const { data, setData, post, processing, errors } = useForm({
    username: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/auth/admin/login'); // Adjust to your login route name
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src={schoolLogo} alt="Logo Sekolah" className="w-14 h-14 mb-2" />
          <h1 className="text-2xl font-semibold text-[#352B4C]">Admin</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <Input
              label="Email"
              placeholder="Masukkan Email"
              value={data.username}
              onChange={(e) => setData("username", e.target.value)}
              className="w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className="border rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
              className="w-4 h-4 text-purple-500 cursor-pointer border-gray-300 rounded focus:ring-purple-400"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Ingat Saya
            </label>
          </div>

          {/* Button Login */}
          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center cursor-pointer"
            disabled={processing}
          >
            {processing ? "Memproses..." : "Login"}
          </Button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <a
            href="#"
            className="text-sm text-[#3b2d63] hover:underline font-medium"
          >
            Lupa Password?
          </a>
        </div>
      </div>
    </div>
  );
}
