import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dotted border-gray-300 bg-gray-100 rounded-md">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          You don’t have any short videos created yet.
        </h2>
        <p className="text-gray-500 mb-6">
          Start by creating your first AI-powered short video now.
        </p>
        <Link href={"/dashboard/create-new"}>
          <Button className="bg-primary text-white px-6 py-3 text-lg font-semibold hover:bg-primary-dark">
            Create New Short Video
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EmptyState;