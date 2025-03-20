'use client'

import BookList from './user-lists/BookList';
import { BookDataProvider, useBookData } from '@/context/BookDataContext';
import { useState } from 'react';
import AddBook from './search-list/AddBook';
import Loading from './Loading';

export default function UserListsContainer({ readBooksCount, readingBooksCount }) {
  const [isReadingList, setIsReadingList] = useState(true);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectUserLists = (bool) => {
    setIsAddingBook(false);
    setIsReadingList(bool);
  }



  return (
    <BookDataProvider>
      {/* {isLoading && <Loading setModal={handleSignOut} />} */}
      <div className="container">
        {!isLoading && (
          <>
            <h2>{isReadingList ? 'Lista de lectura' : 'Libros leidos'}</h2>
            <div className='lists-buttons-container'>
              <button className="button primary" onClick={() => setIsAddingBook(true)}>
                Añadir Nuevo Libro
              </button>
              <button className="button primary" onClick={() => handleSelectUserLists(true)}>
                Lista de Lectura
                <span>{` (${readingBooksCount})`}</span>
              </button>
              <button className="button primary" onClick={() => handleSelectUserLists(false)}>
                Libros Leidos
                <span>{` (${readBooksCount})`}</span>
              </button>
            </div>
          </>
        )}
        {!isAddingBook && <BookList isReadingList={isReadingList} setIsLoading={setIsLoading} />}
        {isAddingBook && <AddBook />}
      </div>
    </BookDataProvider>
  )
}
