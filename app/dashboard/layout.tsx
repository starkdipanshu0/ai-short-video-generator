"use client"
import React from 'react';
import Header from './_components/Header';
import SideNav from './_components/SideNav';
import { VideoDataContext } from '../_context/VideoDataContext';

function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [videoData , setVideoData] = React.useState([]);

  return (
    <VideoDataContext.Provider value={{videoData, setVideoData}}>
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block  h-screen bg-white fixed w-64 shadow-lg">
        <SideNav />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="md:ml-64 mt-20 p-6">
        {children}
      </div>
    </div>
    </VideoDataContext.Provider>
  );
}

export default DashBoardLayout;