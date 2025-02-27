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
import axios from 'axios'



function page() {
  const [videoList,setVideoList] = useState([{}]);
  const {user} = useUser();

  useEffect(() => {
      user&&getVideoList()
    
    }
  , [user])
  

  const getVideoList = async ()=>{
    
    const result = await axios.get('/api/get-video-list').then(res=>{
      console.log(res.data);
      const data = res.data;
      setVideoList(data);
   
    }).catch((e)=>{
      console.log("error:",e);
      alert("video loading is failed");
    });  
  
    
    
    
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