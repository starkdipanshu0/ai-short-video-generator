"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white shadow-md z-50">
        
        {/* Left Section: Sidebar Toggle Button + Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Logo */}
          <img
            src="/clipmania_logo.png"
            alt="Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border-2 border-orange-500 shadow-md hover:scale-105 transition-transform"
          />
          
          {/* Title */}
          <div>
            <h1 className="text-xl md:text-3xl font-extrabold text-orange-600 drop-shadow-md">
              Clipverse
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              AI-Powered Video Generator
            </p>
          </div>
        </div>

        {/* Right Section: Dashboard Button + User Avatar */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button className="hidden sm:flex bg-primary text-white px-3 py-2 md:px-6 md:py-3 rounded-lg shadow-md hover:bg-primary-dark hover:scale-105 transition-all">
            Dashboard
          </Button>
          <UserButton />
        </div>
      </header>

      {/* Sidebar (Mobile) */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar Content */}
          <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 px-6 py-8 z-50 transition-transform transform translate-x-0">
            {/* Close Button */}
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 transition"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>

            {/* Sidebar Menu */}
            <nav className="flex flex-col gap-4 mt-10">
              <Link href="/dashboard">
                <a className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">Dashboard</a>
              </Link>
              <Link href="/dashboard/create-new">
                <a className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">Create New</a>
              </Link>
              <Link href="/upgrade">
                <a className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">Upgrade</a>
              </Link>
              <Link href="/account">
                <a className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">Account</a>
              </Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}

export default Header;
