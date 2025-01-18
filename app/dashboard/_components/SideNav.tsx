"use client";

import React from "react";
import { CircleUserIcon, FileVideo, LucidePanelsTopLeft, ShieldIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
  const menuOptions = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: LucidePanelsTopLeft,
    },
    {
      id: 2,
      name: "Create New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
    {
      id: 3,
      name: "Upgrade",
      path: "/upgrade",
      icon: ShieldIcon,
    },
    {
      id: 4,
      name: "Account",
      path: "/account",
      icon: CircleUserIcon,
    },
  ];

  const currentPath = usePathname();

  return (
    <aside className="w-64 h-screen p-6 bg-white shadow-md pt-10">
      <div className="flex flex-col gap-4">
        {menuOptions.map((item) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer transition-colors 
                ${currentPath === item.path ? "bg-primary text-white" : "hover:bg-primary-light hover:text-primary-dark"}`}
            >
              <item.icon className="w-6 h-6" />
              <h2 className="font-medium">{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default SideNav;