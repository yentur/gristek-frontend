import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MainContent from "./MainContent";
import TechnicalSupport from "./TechnicalSupport";

const Corporate = () => {
    const [activePage, setActivePage] = useState("home");
    const [hasIssue, setHasIssue] = useState(false);
    const [isReported, setIsReported] = useState(false);

    const handleReport = () => {
        setIsReported(true);
    };

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
                <Topbar organizationName="Çorum Belediyesi" />

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
