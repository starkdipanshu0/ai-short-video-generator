import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='flex items-center p-3 justify-between shadow-lg'>
        <div className='flex items-center p-3 '>
            <h1 className='font-extrabold text-orange-600 text-xl'>AI Short Video Generator</h1>
        </div>
        <div className='flex items-center p-3 gap-3'>
            <Button>Dashboard</Button>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header 