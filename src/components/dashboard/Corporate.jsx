import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MainContent from "./MainContent";
import TechnicalSupport from "./TechnicalSupport";
import axios from "axios";

const Corporate = () => {
  const [activePage, setActivePage] = useState("home");
  const [hasIssue, setHasIssue] = useState(false);
  const [me, setMe] = useState("");
  const [isReported, setIsReported] = useState(false);

  const handleReport = () => {
    setIsReported(true);
  };

  const getMe = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const name = response.data
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
  
      setMe(name);
    } catch (err) {
      console.error("Get me error:", err);
    }
  };
  

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        hasIssue={hasIssue}
        handleReport={handleReport}
        isReported={isReported}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar organizationName={me} />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50">
          {activePage === "home" && <MainContent />}
          {activePage === "support" && <TechnicalSupport />}
        </div>
      </div>
    </div>
  );
};

export default Corporate;
