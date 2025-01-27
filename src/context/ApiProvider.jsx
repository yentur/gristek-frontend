import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState({
    totalSavings: null,
    dailySavings: null,
    monthlySavings: [],
  });
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // /tasarruf isteği
      const savingsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasarruf`
      );

      // /aylik-tasarruf isteği
      const monthlySavingsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/aylik-tasarruf`
      );

      setData({
        totalSavings: savingsResponse.data.totalSavings,
        dailySavings: savingsResponse.data.dailySavings,
        monthlySavings: monthlySavingsResponse.data.data,
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

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);