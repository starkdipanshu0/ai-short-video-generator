import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import React from 'react'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'

function page() {
  const videoList= []
  
  
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
      
    </div>
  )

}

export default page