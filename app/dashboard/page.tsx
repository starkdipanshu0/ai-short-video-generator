'use client'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'

import { useUser } from '@clerk/nextjs'
import VideoList from './_components/VideoList'
import axios from 'axios'

function Page() {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) getVideoList();
  }, [user]);

  const getVideoList = async () => {
    try {
      const res = await axios.get('/api/get-video-list');
      setVideoList(res.data);
    } catch (e) {
      console.error("Error loading videos:", e);
      alert("Failed to load videos.");
    }
  };

  return (
    <div className="p-0 sm:p-10">
      
      {/* Dashboard Header */}
      <div className="mb-6">
        <h2 className="font-extrabold text-3xl text-primary">Dashboard</h2>
      </div>

      {/* Create New Button (Fixed below navbar) */}
      <div className="fixed top-20 right-4 sm:right-10 z-50">
        <Link href={'/dashboard/create-new'}>
          <Button className="bg-primary text-white px-4 py-2 flex items-center gap-2 shadow-md hover:bg-primary-dark transition">
            <CirclePlus className="h-5 w-5" />
            Create New
          </Button>
        </Link>
      </div>

      {/* Content */}
      {videoList?.length === 0 ? (
        <EmptyState />
      ) : (
        <VideoList videoList={videoList} />
      )}
      
    </div>
  );
}

export default Page;
