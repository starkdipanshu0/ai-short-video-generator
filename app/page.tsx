
// import { UserButton} from '@clerk/nextjs'
// import { Button } from "@/components/ui/button"
// export default function Home() {
//   return (
//     <div>
//       <div>
//       AI Short Video Generator

//       </div>
//       <div>
//       <UserButton/>
//       <Button>hello</Button>

//       </div>
//     </div>
//   );
// }


'use client';

import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="px-10 pb-10 pt-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        {/* <h1 className="font-extrabold text-3xl text-primary">AI Short Video Generator</h1> */}
        <div className="flex items-center gap-4 p-4 ">
          {/* Logo */}
          <img
            src="/clipmania_logo.png"
            alt="Logo"
            className="h-12 w-12 object-cover rounded-full border-2 border-orange-500 shadow-md"
          />

          {/* Title */}
          <div>
            <h1 className="text-4xl font-extrabold text-orange-600 drop-shadow-md">
              Clipverse
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              AI-Powered Short Video Generator
            </p>
          </div>
        </div>
        <Link href="/dashboard">
          <Button className="bg-primary text-white flex items-center gap-2">
            <CirclePlus size={18} />
            Get Started
          </Button>
        </Link>
      </div>

      {/* Introduction Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create Stunning Videos with Ease</h2>
        <p className="text-gray-600">
          Transform your ideas into engaging short videos with AI-powered tools. Whether you're creating for social media, marketing, or fun, our generator helps you produce professional results in no time.
        </p>
        <Link href="/dashboard">
          <Button className="mt-6 bg-primary text-white">
            Start Creating
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">AI-Powered Video Scripts</h3>
          <p className="text-gray-600 mt-2">Generate creative scripts tailored to your vision in seconds.</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Custom Visuals</h3>
          <p className="text-gray-600 mt-2">Use AI-generated visuals to bring your scripts to life seamlessly.</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Simple & Intuitive</h3>
          <p className="text-gray-600 mt-2">A user-friendly interface designed for creators of all levels.</p>
        </div>
      </div>
    </div>
  );
}
