import { useState, useEffect } from "react";

export function useBookSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [searchFields, setSearchFields] = useState({
    general: true, // Por defecto, búsqueda general
    title: false,
    author: false,
    category: false,
    isbn: false,
  });

  // Construye la consulta de búsqueda basada en el campo seleccionado
  const buildQuery = () => {
    if (searchFields.general) return searchTerm; // Búsqueda general
    if (searchFields.title) return `intitle:${searchTerm}`;
    if (searchFields.author) return `inauthor:${searchTerm}`;
    if (searchFields.category) return `subject:${searchTerm}`;
    if (searchFields.isbn) return `isbn:${searchTerm}`;
    return ""; // Si no hay campos seleccionados, retorna vacío
  };

  // Función para realizar la búsqueda
  const fetchBooks = async (reset = false, customStartIndex = 0) => {
    if (!searchTerm) return; // No realizar búsqueda si el término está vacío

    setIsLoading(true);
    try {
      const query = buildQuery();
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&projection=full&startIndex=${customStartIndex}&maxResults=10&orderBy=relevance`
      );
      const data = await response.json();

      // Filtrar libros duplicados por ID
      setSearchResults((prevResults) => {
        const newBooks = (data.items || []).filter(
          (newBook) => !prevResults.some((existingBook) => existingBook.id === newBook.id)
        );
        return reset ? newBooks : [...prevResults, ...newBooks];
      });
    } catch (error) {
      console.error("Error searching books:", error);
      if (reset) setSearchResults([]); // Limpia resultados si es una nueva búsqueda
    } finally {
      setIsLoading(false);
    }
  };

  // Maneja el evento de búsqueda inicial
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResults([]); // Limpia resultados anteriores
    setStartIndex(0); // Reinicia el índice para una nueva búsqueda
    fetchBooks(true, 0); // Realiza la búsqueda inicial y reinicia los resultados
  };

  // Maneja los cambios en los campos de búsqueda
  const handleFieldChange = (field: string) => {
    setSearchFields({
      general: field === "general",
      title: field === "title",
      author: field === "author",
      category: field === "category",
      isbn: field === "isbn",
    });
    setSearchResults([]); // Limpia resultados anteriores
    setStartIndex(0); // Reinicia el índice para una nueva búsqueda
  };

  // Realiza una nueva búsqueda cuando cambian los campos de búsqueda
  useEffect(() => {
    fetchBooks(true, 0);
  }, [searchFields]);

  // Maneja la carga de más resultados
  const loadMore = () => {
    const newIndex = startIndex + 10;
    setStartIndex(newIndex); // Actualiza el índice
    fetchBooks(false, newIndex); // Realiza la búsqueda para cargar más resultados
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    handleSearch,
    loadMore,
    searchFields,
    handleFieldChange,
  };
}
