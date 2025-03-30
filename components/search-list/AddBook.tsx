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
        {[
          { label: "General", field: "general" },
          { label: "Título", field: "title" },
          { label: "Autor", field: "author" },
          { label: "Categoría", field: "category" },
          { label: "ISBN", field: "isbn" },
        ].map(({ label, field }) => (
          <label key={field}>
            <input
              type="radio"
              checked={searchFields[field as keyof typeof searchFields]}
              onChange={() => handleFieldChange(field)}
            />
            {label}
          </label>
        ))}
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
              className={`button ${isLoading ? "" : "primary"}`}
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
