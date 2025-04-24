import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { query, startIndex = 0, maxResults = 10 } = Object.fromEntries(req.nextUrl.searchParams);

  if (!query) {
    return NextResponse.json({ error: 'Missing searchTerm parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&projection=full&orderBy=relevance&key=${process.env.GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: data.error }, { status: response.status });
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
