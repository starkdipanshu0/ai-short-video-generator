"use client";

import React, { useState } from "react";
import { 
  CircleUserIcon, 
  FileVideo, 
  LucidePanelsTopLeft, 
  ShieldIcon,
  Menu
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
  const menuOptions = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: LucidePanelsTopLeft },
    { id: 2, name: "Create New", path: "/dashboard/create-new", icon: FileVideo },
    { id: 3, name: "Upgrade", path: "/upgrade", icon: ShieldIcon },
    { id: 4, name: "Account", path: "/account", icon: CircleUserIcon },
  ];

  const currentPath = usePathname();

  return (
    <>
    
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-white shadow-lg border-r border-gray-200 px-6 py-8 transition-transform sm:translate-x-0 w-64`}>
        {/* Navigation Links */}
        <nav className="flex flex-col gap-3">
          {menuOptions.map((item) => (
            <Link href={item.path} key={item.id} className="focus:outline-none">
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 
                  ${
                    currentPath === item.path 
                      ? "bg-primary text-white shadow-md" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                aria-current={currentPath === item.path ? "page" : undefined}
              >
                <item.icon className="w-6 h-6" />
                <h2 className="text-lg font-medium">{item.name}</h2>
              </div>
            </Link>
          ))}
        </nav>

        {/* Upgrade Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <Link href="/upgrade">
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform">
              <ShieldIcon className="w-5 h-5" />
              <span className="font-medium">Upgrade Plan</span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
export default SideNav