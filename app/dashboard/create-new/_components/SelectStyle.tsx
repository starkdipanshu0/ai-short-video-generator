import React, { useState } from 'react';

function SelectStyle({ onUserSelect }: any) {
  const styleOptions = [
    { name: 'Realistic', image: 'realistic.png' },
    { name: 'Cartoon', image: 'cartoon.png' },
    { name: 'Anime', image: 'anime.png' },
    { name: 'Comic', image: 'comic.png' },
    { name: 'Abstract', image: 'abstract.png' },
  ];

  const [selectedStyle, setSelectedStyle] = useState('');

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-primary mb-2">Select Your Video Style</h2>
      <p className="text-gray-500 mb-6">Choose a style to customize your video.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
  {styleOptions.map((option) => (
    <div
      key={option.name}
      role="button"
      aria-selected={selectedStyle === option.name}
      className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 transform cursor-pointer 
        ${
          selectedStyle === option.name 
            ? "border-primary shadow-xl scale-105 ring-2 ring-primary" 
            : "border-gray-300 hover:border-primary hover:scale-105 hover:shadow-md"
        }`}
      onClick={() => {
        setSelectedStyle(option.name);
        onUserSelect("style", option.name);
      }}
    >
      {/* Image */}
      <img
        src={`/${option.image}`}
        alt={`${option.name} style`}
        className="h-44 w-full object-cover transition-transform duration-300"
      />

      {/* Floating Label for Mobile */}
      <div
        className="absolute top-2 left-2 bg-black/60 text-white text-xs sm:text-sm md:text-base font-semibold px-2 py-1 rounded-md"
      >
        {option.name}
      </div>
    </div>
  ))}
</div>


      
    </div>
  );
}

export default SelectStyle;
