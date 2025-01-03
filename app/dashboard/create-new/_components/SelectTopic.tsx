"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectTopic({ onUserSelect }: any) {
  const options = ["Custom Prompt", "Random AI Story", "Scary Story", "Funny Story"];
  const [selectedOption, setSelectedOption] = React.useState("");

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-primary mb-2">Content Topic</h2>
      <p className="text-gray-500 mb-4">What is the topic of your video?</p>

      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value !== "Custom Prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
          <SelectValue placeholder="Select Content Type" />
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

      {selectedOption === "Custom Prompt" && (
        <div className="mt-4">
          <label
            htmlFor="custom-prompt"
            className="block text-lg font-medium text-gray-700"
          >
            Enter your custom prompt
          </label>
          <input
            id="custom-prompt"
            type="text"
            placeholder="Write your unique prompt here..."
            onChange={(e) => onUserSelect("topic", e.target.value)}
            className="w-full p-4 mt-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}
    </div>
  );
}

export default SelectTopic;
