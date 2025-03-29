"use client";
import { useBookSearch } from "@/hooks/useBookSearch";
import BookItem from "../BookItem";

export default function AddBook() {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    handleSearch,
    loadMore,
    searchFields,
    handleFieldChange,
  } = useBookSearch();

  return (
    <div className="add-book-form">
      <form onSubmit={handleSearch}>
        <div className="add-book-form-input">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar libros en Google Books..."
          />
          <button
            onClick={() => setSearchTerm("")}
            type="button"
            className="button danger"
          >
            ✖
          </button>
        </div>
        <button type="submit" className="button primary" disabled={isLoading}>
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      <div className="add-book-form-fields">
        <label>
          <input
            type="radio"
            checked={searchFields.general}
            onChange={() => handleFieldChange("general")}
          />
          General
        </label>
        <label>
          <input
            type="radio"
            checked={searchFields.title}
            onChange={() => handleFieldChange("title")}
          />
          Título
        </label>
        <label>
          <input
            type="radio"
            checked={searchFields.author}
            onChange={() => handleFieldChange("author")}
          />
          Autor
        </label>
        <label>
          <input
            type="radio"
            checked={searchFields.category}
            onChange={() => handleFieldChange("category")}
          />
          Categoría
        </label>
        <label>
          <input
            type="radio"
            checked={searchFields.isbn}
            onChange={() => handleFieldChange("isbn")}
          />
          ISBN
        </label>
      </div>
      <div className="search-results">
        {isLoading && !searchResults.length ? (
          <p>Buscando libros...</p>
        ) : searchResults.length > 0 ? (
          <>
            <ul>
              {searchResults.map((book) => (
                <li key={book.id}>
                  <BookItem book={book} isSearch />
                </li>
              ))}
            </ul>
            <button
              onClick={loadMore}
              className={`button ${isLoading ? "info" : "primary"}`}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Cargar más"}
            </button>
          </>
        ) : (
          <p>No se encontraron resultados. Intenta con otra búsqueda.</p>
        )}
      </div>
    </div>
  );
}
