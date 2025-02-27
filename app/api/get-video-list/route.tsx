import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/configs/db'
import { VideoData } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { getAuth,currentUser } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user details from Clerk
    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    // Fetch videos where `createdBy` matches the user's email
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.createdBy, userEmail));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching video list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
