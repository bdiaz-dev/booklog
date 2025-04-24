import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
  const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
    }
    
    const { googleId } = Object.fromEntries(req.nextUrl.searchParams);

  if (!googleId) {
    return NextResponse.json({ error: 'Invalid googleId' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${googleId}?key=${process.env.GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: data.error });
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
