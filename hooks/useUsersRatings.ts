import { useState, useEffect } from 'react';

interface RatingCount {
  like: number;
  normal: number;
  dislike: number;
}

const useUsersRatings = (googleId: string) => {
  const [ratings, setRatings] = useState<RatingCount>({ like: 0, normal: 0, dislike: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`/api/ratings/${googleId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ratings');
        }
        const data: RatingCount = await response.json();
        setRatings(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [googleId]);

  return { ratings, loading, error };
};

export default useUsersRatings;
