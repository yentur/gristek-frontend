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

    console.log(activePage)

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                hasIssue={hasIssue}
                handleReport={handleReport}
                isReported={isReported}
            />

            <div className="flex-1 flex flex-col">
                <Topbar organizationName="Çorum Belediyesi" />

                {activePage === "home" && <MainContent />}
                {activePage === "support" && <TechnicalSupport />}
            </div>
        </div>
    );
};

export default Corporate;
