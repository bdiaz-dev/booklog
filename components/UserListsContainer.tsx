'use client'

import BookList from './user-lists/BookList';
import { BookDataProvider, useBookData } from '@/context/BookDataContext';
import { useEffect, useState } from 'react';
import AddBook from './search-list/AddBook';
import Loading from './Loading';
import ScrollToTopButton from './ScrollToTopButton';
import { useIsMobile } from '@/hooks/use-mobile';

export default function UserListsContainer({ readBooksCount, readingBooksCount }) {
  const [isReadingList, setIsReadingList] = useState(true);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  const handleSelectUserLists = (bool) => {
    setIsAddingBook(false);
    setIsReadingList(bool);
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);



  return (
    <BookDataProvider>
      {/* {isLoading && <Loading setModal={handleSignOut} />} */}
      {!isLoading && (
        <>
          {/* <h2>{isAddingBook ? 'Añadir nuevo libro' : isReadingList ? 'Lista de lectura' : 'Libros leidos'}</h2> */}
          {isMobile ? (
            <div className='lists-mobile-buttons-container'>
              <button
                className={`button ${isAddingBook ? 'active' : 'primary'}`}
                onClick={() => setIsAddingBook(true)}
              >
                <span>🔍</span>
              </button>
              <button
                className={`button ${isReadingList && !isAddingBook ? 'active' : 'primary'}`}
                onClick={() => handleSelectUserLists(true)}
              >
                <span>📚</span>
                <span className='book-count'>{`${readingBooksCount}`}</span>
              </button>
              <button
                className={`button ${!isReadingList && !isAddingBook ? 'active' : 'primary'}`}
                onClick={() => handleSelectUserLists(false)}
              >
                <span>✅</span>
                <span className='book-count'>{`${readBooksCount}`}</span>
              </button>
            </div>
          ) : (
            <div className='lists-buttons-container'>
              <button
                className={`button ${isAddingBook ? 'active' : 'primary'}`}
                onClick={() => setIsAddingBook(true)}
              >
                <span>🔍</span>
                <span>Buscar Libros</span>
              </button>
              <button
                className={`button ${isReadingList && !isAddingBook ? 'active' : 'primary'}`}
                onClick={() => handleSelectUserLists(true)}
              >
                <span>📚 </span>
                <span>Lista de Lectura</span>
                <span className='book-count'>{`${readingBooksCount}`}</span>
              </button>
              <button
                className={`button ${!isReadingList && !isAddingBook ? 'active' : 'primary'}`}
                onClick={() => handleSelectUserLists(false)}
              >
                <span>✅ </span>
                <span>Libros leidos</span>
                <span className='book-count'>{`${readBooksCount}`}</span>
              </button>
            </div>
          )}

          <ScrollToTopButton />
        </>
      )}
      <div className="container" data-isMobile={isMobile}>
        {!isAddingBook && <BookList isReadingList={isReadingList} setIsLoading={setIsLoading} />}
        {isAddingBook && <AddBook />}
      </div>
    </BookDataProvider>
  )
}
