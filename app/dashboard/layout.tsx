"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import MobileNav from "./_components/MobileNavbar"; // New Mobile Navigation
import { VideoDataContext } from "../_context/VideoDataContext";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const [videoData, setVideoData] = React.useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <VideoDataContext.Provider value={{ videoData, setVideoData }}>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar for Larger Screens */}
        <div className={`fixed h-screen bg-white w-64 shadow-lg z-50 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}>
          <SideNav  />
        </div>

        {/* Header */}
        <Header  />

        {/* Main Content */}
        <main className="md:ml-64 mt-20 p-4 sm:p-6">
          {children}
        </main>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden fixed bottom-0 w-full bg-white shadow-lg border-t">
          <MobileNav />
        </div>
      </div>
    </VideoDataContext.Provider>
  );
}

export default DashBoardLayout;
