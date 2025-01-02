"use client"
import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'

function Provider({children}:any) {
  const {user} = useUser();
  
  useEffect(() => {
    if(user)newUser();
  }, [user]);


  const newUser = async()=>{

    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("Email address is undefined");
      return;
    }
    
    const result = await db.select().from(Users)
    .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    
    if(!result[0]){
      await db.insert(Users).values({
        name: user?.fullName??"",
        email:user?.primaryEmailAddress?.emailAddress,
        imageUrl:user?.imageUrl

      })
    }

  }

  return (
    <div>{children}</div>
  )
}

export default Provider