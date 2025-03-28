import { useState } from 'react';
import { useBookData } from '@/context/BookDataContext';
import { useMarkAsRead } from '@/hooks/useMarkAsRead';

export function useFeedback(isGoogleSearch: boolean, handleError: (() => void) | null) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleMarkAsRead } = useMarkAsRead();
  const { readedList, setReadedList, readingList, setReadingList } = useBookData();

  const handleFeedback = async (book, response, readedDate, setShowFeedback) => {
    setIsLoading(true);
    const bookid = isGoogleSearch ? book.id : book.googleId;
    const result = await handleMarkAsRead(bookid, response, readedDate);

    if (result.success) {
      const bookToChange = readingList.find((b) => b.googleId === bookid);
      if (!!bookToChange) {
        Object.assign(bookToChange, {
          rating: response,
          readedDate: readedDate,
          isRead: true
        });
        setReadedList([...readedList, bookToChange]);
        setReadingList(readingList.filter((b) => b.googleId !== bookToChange.googleId));
      } else {
        const bookToChange = readedList.find((b) => b.googleId === bookid);
        if (!!bookToChange) {
          Object.assign(bookToChange, {
            rating: response,
            readedDate: readedDate,
            isRead: true
          });
          setReadedList(readedList.map((b) => b.googleId === bookid ? bookToChange : b));
        }
      }
      setIsLoading(false);
      setShowFeedback(false);
    } else {
      if (handleError !== null) {
        handleError();
      }
      setIsLoading(false);
    }
  };

  return { handleFeedback, isLoading };
}
