import React from 'react';
import Header from './_components/Header';
import SideNav from './_components/SideNav';

function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}

export default DashBoardLayout;