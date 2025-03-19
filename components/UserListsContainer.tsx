'use client'

import BookList from './user-lists/BookList';
import { BookDataProvider } from '@/context/BookDataContext';
import { useState } from 'react';
import AddBook from './search-list/AddBook';

export default function UserListsContainer({ readBooksCount, readingBooksCount }) {
  const [isReadingList, setIsReadingList] = useState(true);
  const [isAddingBook, setIsAddingBook] = useState(false);

  const handleSelectUserLists = (bool) => {
    setIsAddingBook(false);
    setIsReadingList(bool);
  }

  return (
    <div className="container">
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
      <BookDataProvider>
        {!isAddingBook && <BookList isReadingList={isReadingList} />}
        {isAddingBook && <AddBook />}
      </BookDataProvider>
    </div>
  )
}
