import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../dist/images/gristek_logo_new.png";

const Login = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token")
    if (token) {
      navigate("/kurumsal");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = { username, password };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      navigate("/kurumsal");
    } catch (err) {
      setError(
        "Giriş başarısız. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin."
      );
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Gristek Logo" className="w-32 h-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Hoş Geldiniz!
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2 mb-6">
          Lütfen giriş yaparak devam edin.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              placeholder="Kullanıcı adınızı girin"
              className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              placeholder="Şifrenizi girin"
              className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Şifremi unuttum
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200"
          >
            Giriş Yap
          </button>
        </form>

        <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-400">
          © 2025 Gristek. Tüm hakları saklıdır.
        </div>
      </div>
    </div>
  );
};

export default Login;
