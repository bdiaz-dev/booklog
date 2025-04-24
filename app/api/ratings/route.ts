import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

interface RatingCount {
  wonderfull: number;
  like: number;
  normal: number;
  dislike: number;
}

export async function GET(req: NextRequest) {
  const {googleId} = Object.fromEntries(req.nextUrl.searchParams)

  if (!googleId) {
    return NextResponse.json({ error: 'Invalid googleId' }, { status: 400 });
  }

  try {
    const ratingsData = await prisma.book.findMany({
      where: { googleId },
      select: { rating: true },
    });

    const ratingsCount: RatingCount = { wonderfull: 0, like: 0, normal: 0, dislike: 0 };

    ratingsData.forEach((book) => {
      const ratingValue = book.rating;
      if (ratingValue === 'wonderfull') {
        ratingsCount.wonderfull++;
      } else if (ratingValue === 'like') {
        ratingsCount.like++;
      } else if (ratingValue === 'normal') {
        ratingsCount.normal++;
      } else if (ratingValue === 'dislike') {
        ratingsCount.dislike++;
      }
    });

    return NextResponse.json(ratingsCount, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 });
  }
}
