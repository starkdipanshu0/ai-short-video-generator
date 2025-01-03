"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-6 py-6 bg-white shadow-md z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-2   ">
  <img
    src="/clipmania_logo.png"
    alt="Logo"
    className="h-10 object-contain rounded-full  shadow-md"
  />
  <h1 className="text-3xl font-extrabold text-orange-600 drop-shadow-lg">
    ClipMania
  </h1>
</div>

      {/* Action Buttons Section */}
      <div className="flex items-center gap-4">
        <Button className="bg-primary text-white hover:bg-primary-dark transition-colors">
          Dashboard
        </Button>
        <UserButton />
      </div>
    </header>
  );
}

export default Header;