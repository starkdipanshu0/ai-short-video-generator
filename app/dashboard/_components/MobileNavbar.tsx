"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus, Home, User } from "lucide-react";
import Link from "next/link";

function MobileNavbar() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around py-3">
      <Link href="/dashboard">
        <Button variant="ghost" className="flex flex-col items-center text-gray-700">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Button>
      </Link>

      <Link href="/dashboard/create-new">
        <Button className="bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <CirclePlus className="h-6 w-6" />
        </Button>
      </Link>

      <Link href="/account">
        <Button variant="ghost" className="flex flex-col items-center text-gray-700">
          <User className="h-6 w-6" />
          <span className="text-xs">Account</span>
        </Button>
      </Link>
    </div>
  );
}

export default MobileNavbar;
