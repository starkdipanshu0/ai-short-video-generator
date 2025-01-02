import { Button } from '@/components/ui/button'

import React from 'react'
import Link from 'next/link'
function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center h-[60vh] border-2 border-dotted border-gray-300 bg-slate-100'>
        <h2 className='p-3'>You does not have any short video created</h2>
        <Link href={'/dashboard/create-new'}>
        <Button className='bg-primary text-white p-3'>Create New Short Video</Button>
        </Link>
    </div>
  )
}

export default EmptyState