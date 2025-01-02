"use client"
import React from 'react'
import { CircleUserIcon, FileVideo,  LucidePanelsTopLeft, ShieldIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function SideNav() {
    const MenuOption =[
        {
            id:1,
            name:"DashBoard",
            path:"/dashboard",
            image:LucidePanelsTopLeft
        },
        {
            id:2,
            name:"Create New",
            path:"dashboard/create-new",
            image:FileVideo
        },
        {
            id:3,
            name:"Upgrade",
            path:"/upgrade",
            image:ShieldIcon
        },{
            id:4,
            name:"Account",
            path:"/account",
            image:CircleUserIcon
        },
    ]
    const path = usePathname();
  return (
    <div className=' w-64 h-screen p-5 shadow-md'>
        <div className='grid gap-2'>
        
            {   
                MenuOption.map((item,index)=>{
                    return(
                        <Link href={item.path} key={item.id}>

                        <div className={`flex items-center gap-4 p-3 rounded-md hover:cursor-pointer hover:bg-primary hover:text-white ${path==item.path&&'bg-primary text-white'}`}>
                            <item.image/>
                            <h2>{item.name}</h2>
                        </div>
                        </Link>
                    )
                })
            }
        </div>
        
    </div>
  )
}

export default SideNav