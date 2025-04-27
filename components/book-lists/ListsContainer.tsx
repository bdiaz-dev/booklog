'use client'

import BookList from '@/components/book-lists/BookList';
import { BookDataProvider } from '@/context/BookDataContext';
import { useState } from 'react';
import AddBook from '@/components/book-lists/AddBook';
import ScrollToTopButton from '@/components/interface/buttons/ScrollToTopButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { SortAndFilterProvider, useSortAndFilterContext } from '@/context/SortAndFilterContext';
import { ListsProvider, useListContext } from '@/context/ListsContext';

export interface ListsContainerProps {
  readBooksCount: number
  readingBooksCount: number
}

export default function ListsContainer({ readBooksCount, readingBooksCount }: ListsContainerProps) {
  return (
    <ListsProvider>
      {/* <BookDataProvider>
        <SortAndFilterProvider> */}
      <ListsContainerContent
        readBooksCount={readBooksCount}
        readingBooksCount={readingBooksCount}
      />
      {/* </SortAndFilterProvider>
      </BookDataProvider> */}
    </ListsProvider>
  )
}

function ListsContainerContent({ readBooksCount, readingBooksCount }: ListsContainerProps) {
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { isReadingList, setIsReadingList } = useListContext()
  // const { mode } = useSortAndFilterContext()

  const handleSelectUserLists = (bool: boolean) => {
    setIsAddingBook(false);
    setIsReadingList(bool);
  }

  return (
    <BookDataProvider>
      <>
        {!isLoading && (
          <>
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
        <div className="container" data-ismobile={isMobile}>
          {!isAddingBook &&
            <SortAndFilterProvider >
              <BookList setIsLoading={setIsLoading} />
            </SortAndFilterProvider>
          }
          {isAddingBook && <AddBook />}
        </div>
      </>
    </BookDataProvider>
  )
}
