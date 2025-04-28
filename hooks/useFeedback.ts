import { useEffect, useState } from 'react';
import { useBookData } from '@/context/BookDataContext';
import { useMarkAsRead } from '@/hooks/useMarkAsRead';
import { UserBook } from '@/lib/types/types';
import { useMarkStarted } from './useMarkStarted';

export interface HandleFeedbackProps {
  // book: UserBook
  response: string
  // isReaded: boolean
  // startedDate: string
  // readedDate: string
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>
}

// actualizar componente de feedback para que use el nuevo hook

export function useFeedback(book: UserBook, isGoogleSearch: boolean, handleError: (() => void) | null) {
  const [isLoading, setIsLoading] = useState(false)
  const { handleMarkAsRead } = useMarkAsRead()
  const { handleMarkStarted } = useMarkStarted()
  const { readedList, setReadedList, readingList, setReadingList } = useBookData()
  const [isReaded, setIsReaded] = useState(!!book.isRead)
  const [readedToday, setReadedToday] = useState(true)
  const [readedDate, setReadedDate] = useState(new Date().toISOString().split("T")[0])
  const [isStarted, setIsStarted] = useState(!!book.isStarted)
  const [startedToday, setStartedToday] = useState(true)
  const [startedDate, setStartedDate] = useState(new Date().toISOString().split("T")[0])

    useEffect(() => {
      if (book.isStarted) {
        const actualDate = new Date(book.startedDate ?? new Date()).toISOString().split("T")[0]
        setStartedDate(actualDate)
        setStartedToday(false)
      }
      if (book.isRead) {
        const actualDate = new Date(book.readedDate ?? new Date()).toISOString().split("T")[0]
        setReadedDate(actualDate)
        setReadedToday(false)
      }
    }, [book])
    
    useEffect(() => {
      if (isReaded && !isStarted) {
        setIsStarted(true)
      }
    }, [isReaded])

  const handleFeedback = async ({ 
    // book, 
    response, 
    // isReaded, startedDate, readedDate, 
    setShowFeedback 
  }: HandleFeedbackProps) => {
    setIsLoading(true);
    const bookid = isGoogleSearch ? book.id : book.googleId

    const result = await handleMarkStarted(bookid, startedDate)
    
    if (!result.success) {
      if (handleError !== null) {
        handleError();
      }
      setIsLoading(false)
      return
    }

    const bookToChange = readingList.find((b) => b.googleId === bookid)
    if (!!bookToChange) {
      Object.assign(bookToChange, {
        startedDate: startedDate,
        isStarted: true
      });
      setReadingList(readingList.map((b) => b.googleId === bookid ? bookToChange : b))
    } else {
      const bookToChange = readedList.find((b) => b.googleId === bookid);
      if (!!bookToChange) {
        Object.assign(bookToChange, {
          startedDate: startedDate,
          isStarted: true
        })
        setReadedList(readedList.map((b) => b.googleId === bookid ? bookToChange : b))
        // setIsLoading(false)
        // setShowFeedback(false)
      }
    }

    if (isReaded) {
      setIsLoading(true)
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
        // setIsLoading(false);
        // setShowFeedback(false);
      } else {
        if (handleError !== null) {
          handleError();
        }
        setIsLoading(false);
        return
      }
    }
    
    // console.log("Leidos", readedList,"Lista lectura" , readingList)
    
    setIsLoading(false);
    setShowFeedback(false);
  };

  return {
    handleFeedback,
    isLoading,
    isReaded,
    setIsReaded,
    readedToday,
    setReadedToday,
    readedDate,
    setReadedDate,
    isStarted,
    setIsStarted,
    startedToday,
    setStartedToday,
    startedDate,
    setStartedDate,
  };
}
