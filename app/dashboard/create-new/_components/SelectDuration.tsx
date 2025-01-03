"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectDuration({ onUserSelect }: any) {
  const options = ["15 seconds", "30 seconds", "60 seconds"];
  const [selectedDuration, setSelectedDuration] = React.useState("");

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-primary mb-2">Video Duration</h2>
      <p className="text-gray-500 mb-4">Select the duration for your video.</p>

      <Select
        onValueChange={(value) => {
          setSelectedDuration(value);
          onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-md rounded-md">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="p-3 text-lg hover:bg-primary hover:text-white cursor-pointer transition"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
