import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

interface RatingCount {
  like: number;
  normal: number;
  dislike: number;
}

export async function GET(req: NextRequest, { params }: { params: { googleId: string } }) {
  const {googleId} = await params

  if (!googleId) {
    return NextResponse.json({ error: 'Invalid googleId' }, { status: 400 });
  }

  try {
    const ratingsData = await prisma.book.findMany({
      where: { googleId },
      select: { rating: true },
    });

    const ratingsCount: RatingCount = { like: 0, normal: 0, dislike: 0 };

    ratingsData.forEach((book) => {
      const ratingValue = book.rating;
      if (ratingValue === 'like') {
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
