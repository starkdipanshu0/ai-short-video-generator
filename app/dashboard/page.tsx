'use client'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'
import CustomLoading from './create-new/_components/CustomLoading'
import { db } from '@/configs/db'
import { VideoData } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import VideoList from './_components/VideoList'



function page() {
  const [videoList,setVideoList] = useState([{}]);
  const {user} = useUser();

  useEffect(() => {
      user&&getVideoList()
    
    }
  , [user])
  

  const getVideoList = async()=>{
    try {
      const result = await db
    .select()
    .from(VideoData)
    //@ts-ignore
    .where(eq(VideoData.createdBy, user?.primaryEmailAddress?.emailAddress));
    //console.log(result);
    setVideoList(result);
    } catch (error) {
      console.error("Error fetching video list:", error);
      
    }
    
  }

  return (
    <div className='p-10  '>
      <div className='flex mb-6 justify-between'>
        <h2 className='font-extrabold text-3xl text-primary'>Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
        <Button className='bg-primary text-white'>{<CirclePlus/>} Create New</Button>
        </Link>

      </div>
      
        {
          videoList?.length==0&&<div>
            <EmptyState/>
          </div>
          
        }
        <VideoList videoList={videoList}/>
        
      
    </div>
  )

}

export default page