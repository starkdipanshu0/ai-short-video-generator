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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {styleOptions.map((option) => (
          <div
            key={option.name}
            className={`relative rounded-md overflow-hidden border-2 transition-all duration-200 ${
              selectedStyle === option.name ? 'border-primary shadow-lg scale-105' : 'border-gray-200 hover:border-primary'
            } cursor-pointer`}
            onClick={() => {
              setSelectedStyle(option.name);
              onUserSelect('style', option.name);
            }}
          >
            <img
              src={`/${option.image}`}
              alt={`${option.name} style`}
              className="h-60 w-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-bold text-lg ${
                selectedStyle === option.name ? 'opacity-100' : 'opacity-0 hover:opacity-100'
              } transition-opacity duration-200`}
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
