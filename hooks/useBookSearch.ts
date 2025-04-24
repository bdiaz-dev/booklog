import { useState, useEffect } from "react";

export function useBookSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [searchFields, setSearchFields] = useState({
    general: true,
    title: false,
    author: false,
    category: false,
    isbn: false,
  });

  const buildQuery = () => {
    if (searchFields.general) return searchTerm; // Búsqueda general
    if (searchFields.title) return `intitle:${searchTerm}`;
    if (searchFields.author) return `inauthor:${searchTerm}`;
    if (searchFields.category) return `subject:${searchTerm}`;
    if (searchFields.isbn) return `isbn:${searchTerm}`;
    return ""
  };

  const fetchBooks = async (reset = false, customStartIndex = 0) => {
    if (!searchTerm) return

    setIsLoading(true);
    try {
      const query = buildQuery();
      const response = await fetch(
        `/api/books/searchVolumes?query=${query}&startIndex=${customStartIndex}&maxResults=10`
      );
      const data = await response.json();

      // Filtrar libros duplicados por ID
      setSearchResults((prevResults) => {
        const newBooks = (data.items || []).filter(
          (newBook : string) => !prevResults.some((existingBook) => existingBook.id === newBook.id)
        );
        return reset ? newBooks : [...prevResults, ...newBooks];
      });
    } catch (error) {
      console.error("Error searching books:", error);
      if (reset) setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchResults([])
    setStartIndex(0)
    fetchBooks(true, 0)
  };

  const handleFieldChange = (field: string) => {
    setSearchFields({
      general: field === "general",
      title: field === "title",
      author: field === "author",
      category: field === "category",
      isbn: field === "isbn",
    });
    setSearchResults([])
    setStartIndex(0)
  };

  useEffect(() => {
    fetchBooks(true, 0);
  }, [searchFields]);

  const loadMore = () => {
    const newIndex = startIndex + 10;
    setStartIndex(newIndex)
    fetchBooks(false, newIndex)
  };
  
  const searchBookById = async (bookId: string) => {
    setIsLoading(true)
    try {
      console.log(bookId)
      const response = await fetch(`/api/books/searchById?googleId=${bookId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching book details:", error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    handleSearch,
    loadMore,
    searchFields,
    handleFieldChange,
    searchBookById
  };
}
