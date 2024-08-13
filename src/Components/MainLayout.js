import { useState } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const MainLayout = () => {

    const path = window.location.pathname;
    const showSideBar = path !== "/signIn" && path !== "/" ;

    return (
        <div className="main-layout">
            <MainContent />
            {showSideBar && <Sidebar />}
        </div>
    )
}
export default MainLayout;