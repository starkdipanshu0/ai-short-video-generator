import React from 'react'
import Header from './_components/Header';
import SideNav from './_components/SideNav';

function DashBoardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    console.log(children)
  return (

    <div className=''>
        <div className='hidden md:block mt-[65px] h-screen bg-white fixed w-64 shadow-lg'>
            <SideNav/>
        </div>
        <Header/>
        <div className='ml-64'>
            
             {children}
        </div>
    </div>
  )
}

export default DashBoardLayout