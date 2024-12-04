import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CorporateLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await axios.post('http://localhost:8000/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            localStorage.setItem('token', response.data.access_token);

            navigate("/kurumsal");
        } catch (err) {
            setError("Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Gristek Giriş
                </h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            E-posta Adresi
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="E-posta adresinizi girin"
                            className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">Beni hatırla</span>
                        </label>
                        <a
                            href="#"
                            className="text-sm font-medium text-pc-100 hover:underline"
                        >
                            Şifremi unuttum
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pc-200 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-pc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CorporateLogin;