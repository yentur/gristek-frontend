import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState({
    dailySavings: null,
    weeklySavings: null,
    monthlySavings: null,
    totalSavings: null,
    yearlySavings: null,
    monthlyData: [],
    references: [],
    citiesOverview: {}, // Şehir bazlı veriler
    totalModules: 0, // Toplam cihaz sayısı
    economicImpact: 0, // Ekonomik katkı
    topSavingCity: { name: "Bilinmiyor", savings: 0 }, // En çok tasarruf yapan şehir
  });

  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // API çağrılarını paralel olarak çalıştır
      const [savingsResponse, referencesResponse, citiesResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/savings/all`),
        axios.get(`${process.env.REACT_APP_API_URL}/references`),
        axios.get(`${process.env.REACT_APP_API_URL}/savings/cities-overview`),
      ]);

      setData({
        dailySavings: savingsResponse.data.daily_savings,
        weeklySavings: savingsResponse.data.weekly_savings,
        monthlySavings: savingsResponse.data.monthly_savings,
        totalSavings: savingsResponse.data.total_savings,
        yearlySavings: savingsResponse.data.yearly_savings,
        monthlyData: savingsResponse.data.monthly_data || [],
        references: referencesResponse.data.references || [],
        citiesOverview: citiesResponse.data.cities || {},
        totalModules: citiesResponse.data.totalModules || 0, // Toplam cihaz sayısı
        economicImpact: citiesResponse.data.economicImpact || 0, // Ekonomik katkı
        topSavingCity: citiesResponse.data.topSavingCity || { name: "Bilinmiyor", savings: 0 }, // En çok tasarruf yapan şehir
      });
    } catch (err) {
      console.error("API çağrısı sırasında bir hata oluştu:", err);
      setError("Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = useMemo(() => ({ data, error }), [data, error]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
